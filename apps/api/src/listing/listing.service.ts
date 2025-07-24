import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateListingDto } from './schemas/create-listing.schema';
import { ListingStatus } from 'generated/prisma';

@Injectable()
export class ListingService {

    constructor (private readonly prisma: PrismaService) {}

    async create(createListingDto: CreateListingDto, userId: string) {
        try {
            // Create the listing
            return await this.prisma.client.listing.create({
                data: {
                    ...createListingDto,
                    ownerId: userId
                }
            });

        } catch (error) {
            console.error('Error creating listing:', error);
            
            if (error instanceof NotFoundException) {
                throw error;
            }
            
            if (error.code === 'P2002') {
                // Prisma unique constraint violation
                throw new BadRequestException('A listing with this data already exists');
            }
            
            if (error.code === 'P2003') {
                // Prisma foreign key constraint violation
                throw new BadRequestException('Invalid owner ID provided');
            }
            
            throw new BadRequestException('Failed to create listing: ' + error.message);
        }
    }

    async findById(id: string) {
        try {
            const listing = await this.prisma.client.listing.findUnique({
                where: { 
                    id: id,
                    isActive: true,
                    // status: ListingStatus.active
                },
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            phoneNumber: true,
                            isVerified: true
                        }
                    }
                }
            });

            if (!listing) {
                throw new NotFoundException('Listing not found or not available');
            }

            // Increment view count
            await this.prisma.client.listing.update({
                where: { id: id },
                data: { viewCount: { increment: 1 } }
            });

            return listing;

        } catch (error) {
            console.error('Error fetching listing:', error);
            
            if (error instanceof NotFoundException) {
                throw error;
            }
            
            throw new BadRequestException('Failed to fetch listing: ' + error.message);
        }
    }
}
