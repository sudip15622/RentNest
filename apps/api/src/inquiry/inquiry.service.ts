import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInquiryDto } from './schemas/create-inquiry.schema';
import { InquiryStatus } from '../../generated/prisma';

@Injectable()
export class InquiryService {

    constructor (private readonly prisma: PrismaService) {}

    async create(createInquiryDto: CreateInquiryDto) {
        const listing = await this.prisma.client.listing.findUnique({
            where: {id: createInquiryDto.listingId}
        })

        if(!listing) throw new NotFoundException("Listing not found!");

        return await this.prisma.client.inquiry.create({
            data: createInquiryDto
        })
    }

    async findUserInquiries(
        userId: string,
        options?: {
            page?: number;
            limit?: number;
            status?: InquiryStatus;
        }
    ) {
        try {
            const {
                page = 1,
                limit = 10,
                status,
            } = options || {};

            // Build where clause to get inquiries for all listings owned by the user
            const whereClause: any = {
                listing: {
                    ownerId: userId, // Get inquiries for listings owned by this user
                },
            };

            // Filter by status if provided
            if (status) {
                whereClause.status = status;
            }

            // Calculate pagination
            const skip = (page - 1) * limit;

            // Execute queries
            const [inquiries, totalCount] = await Promise.all([
                this.prisma.client.inquiry.findMany({
                    where: whereClause,
                    include: {
                        listing: {
                            select: {
                                id: true,
                                title: true,
                                location: true,
                                photos: true,
                                monthlyRent: true,
                                roomType: true,
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    skip,
                    take: limit,
                }),
                this.prisma.client.inquiry.count({
                    where: whereClause,
                }),
            ]);

            return {
                inquiries,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / limit),
                    totalCount,
                    hasNext: page < Math.ceil(totalCount / limit),
                    hasPrev: page > 1,
                },
            };
        } catch (error) {
            console.error('Error fetching user inquiries:', error);
            throw new BadRequestException(
                'Failed to fetch user inquiries: ' + error.message,
            );
        }
    }

    async updateInquiryStatus(
        userId: string,
        inquiryId: string,
        status: InquiryStatus
    ) {
        try {
            // First, verify that the inquiry belongs to a listing owned by the user
            const inquiry = await this.prisma.client.inquiry.findUnique({
                where: { id: inquiryId },
                include: {
                    listing: {
                        select: {
                            ownerId: true,
                        },
                    },
                },
            });

            if (!inquiry) {
                throw new NotFoundException('Inquiry not found');
            }

            if (inquiry.listing.ownerId !== userId) {
                throw new BadRequestException('You can only update inquiries for your own listings');
            }

            // Update the inquiry status
            const updatedInquiry = await this.prisma.client.inquiry.update({
                where: { id: inquiryId },
                data: { status },
                include: {
                    listing: {
                        select: {
                            id: true,
                            title: true,
                            location: true,
                            photos: true,
                            monthlyRent: true,
                            roomType: true,
                        },
                    },
                },
            });

            return updatedInquiry;
        } catch (error) {
            console.error('Error updating inquiry status:', error);
            
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            
            throw new BadRequestException(
                'Failed to update inquiry status: ' + error.message,
            );
        }
    }
}
