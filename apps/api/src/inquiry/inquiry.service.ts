import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInquiryDto } from './schemas/create-inquiry.schema';

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
}
