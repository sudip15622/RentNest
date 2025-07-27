import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateListingDto } from './schemas/create-listing.schema';
import { FilterListingDto } from './schemas/filter-listing.schema';
import { ListingStatus } from 'generated/prisma';

@Injectable()
export class ListingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createListingDto: CreateListingDto, userId: string) {
    try {
      // Create the listing
      return await this.prisma.client.listing.create({
        data: {
          ...createListingDto,
          ownerId: userId,
        },
      });
    } catch (error) {
      console.error('Error creating listing:', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error.code === 'P2002') {
        // Prisma unique constraint violation
        throw new BadRequestException(
          'A listing with this data already exists',
        );
      }

      if (error.code === 'P2003') {
        // Prisma foreign key constraint violation
        throw new BadRequestException('Invalid owner ID provided');
      }

      throw new BadRequestException(
        'Failed to create listing: ' + error.message,
      );
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
              isVerified: true,
            },
          },
        },
      });

      if (!listing) {
        throw new NotFoundException('Listing not found or not available');
      }

      // Increment view count
      await this.prisma.client.listing.update({
        where: { id: id },
        data: { viewCount: { increment: 1 } },
      });

      return listing;
    } catch (error) {
      console.error('Error fetching listing:', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(
        'Failed to fetch listing: ' + error.message,
      );
    }
  }

  async findFiltered(filterDto: FilterListingDto) {
    try {
      const {
        searchText,
        city,
        district,
        // location,
        roomType,
        minBedrooms,
        maxBedrooms,
        minBathrooms,
        maxBathrooms,
        minRent,
        maxRent,
        amenities,
        utilitiesIncluded,
        internetIncluded,
        availableFrom,
        page,
        limit,
        sortBy,
        sortOrder,
      } = filterDto;

      // Build where clause dynamically
      const whereClause: any = {
        isActive: true,
        // status: ListingStatus.active
      };

      //search text filters
      if (searchText) {
        whereClause.OR = [
          {
            title: {
              contains: searchText,
              mode: 'insensitive',
            },
          },
          {
            location: {
              contains: searchText,
              mode: 'insensitive',
            },
          },
        ];
      }

      // Location filters (only apply if no searchText)
      if (!searchText && city) {
        whereClause.location = {
          contains: city,
          mode: 'insensitive',
        };
      }

      if (!searchText && district && !city) {
        whereClause.location = {
          contains: district,
          mode: 'insensitive',
        };
      }
      // Property filters
      if (roomType) {
        whereClause.roomType = roomType;
      }

      if (minBedrooms || maxBedrooms) {
        whereClause.bedrooms = {};
        if (minBedrooms) whereClause.bedrooms.gte = minBedrooms;
        if (maxBedrooms) whereClause.bedrooms.lte = maxBedrooms;
      }

      if (minBathrooms || maxBathrooms) {
        whereClause.bathrooms = {};
        if (minBathrooms) whereClause.bathrooms.gte = minBathrooms;
        if (maxBathrooms) whereClause.bathrooms.lte = maxBathrooms;
      }

      // Price filters
      if (minRent || maxRent) {
        whereClause.monthlyRent = {};
        if (minRent) whereClause.monthlyRent.gte = minRent;
        if (maxRent) whereClause.monthlyRent.lte = maxRent;
      }

      // Amenities filter
      if (amenities && amenities.length > 0) {
        whereClause.amenities = {
          hasEvery: amenities,
        };
      }

      // Utilities filters
      if (typeof utilitiesIncluded === 'boolean') {
        whereClause.utilitiesIncluded = utilitiesIncluded;
      }

      if (typeof internetIncluded === 'boolean') {
        whereClause.internetIncluded = internetIncluded;
      }

      // Availability filter
      if (availableFrom) {
        whereClause.availableFrom = {
          lte: new Date(availableFrom),
        };
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Build order by clause
      const orderBy: any = {};
      orderBy[sortBy] = sortOrder;

      // Execute queries
      const [listings, totalCount] = await Promise.all([
        this.prisma.client.listing.findMany({
          where: whereClause,
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                phoneNumber: true,
                isVerified: true,
              },
            },
          },
          orderBy,
          skip,
          take: limit,
        }),
        this.prisma.client.listing.count({
          where: whereClause,
        }),
      ]);
      console.log('total rooms: ', totalCount);

      return {
        listings,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
          hasNext: page < Math.ceil(totalCount / limit),
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      console.error('Error fetching filtered listings:', error);
      throw new BadRequestException(
        'Failed to fetch listings: ' + error.message,
      );
    }
  }

  async findFeatured(limit: number = 6) {
    try {
      // Get featured listings based on view count and recent activity
      const featuredListings = await this.prisma.client.listing.findMany({
        where: {
          isActive: true,
          // featured: true,
          // status: ListingStatus.active
        },
        select: {
          id: true,
          title: true,
          location: true,
          viewCount: true,
          photos: true,
          roomType: true,
          monthlyRent: true,
          featured: true,
          isActive: true,
          status: true,
        },
        orderBy: [{ viewCount: 'desc' }, { createdAt: 'desc' }],
        take: limit,
      });

      return featuredListings;
    } catch (error) {
      console.error('Error fetching featured listings:', error);
      throw new BadRequestException(
        'Failed to fetch featured listings: ' + error.message,
      );
    }
  }
}
