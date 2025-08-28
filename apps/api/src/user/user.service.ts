import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { CreateUserDto } from 'src/auth/schemas/create-user.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './schemas/update-user.schema';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;
    const hashedPassword = await hash(password);
    return await this.prisma.client.user.create({
      data: { ...user, password: hashedPassword },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.client.user.findUnique({
      where: { email: email },
    });
  }
  async findByPhoneNumber(phoneNumber: string) {
    return await this.prisma.client.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });
  }

  async findById(userId: string) {
    return await this.prisma.client.user.findUnique({
      where: { id: userId },
    });
  }

  async updateAccessToken(userId: string, hashedAt: string | null) {
    return await this.prisma.client.user.update({
      where: {
        id: userId,
      },
      data: {
        accessToken: hashedAt,
      },
    });
  }

  async updateBasicDetails(userId: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.client.user.update({
      where: {id: userId},
      data: updateUserDto
    })
  }

  async getUserStats(userId: string) {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [
      totalListings,
      totalViews,
      totalInquiries,
      listingsThisMonth,
      inquiriesToday,
      totalViewsLastWeek,
    ] = await Promise.all([
      // Count total listings by user
      this.prisma.client.listing.count({
        where: { ownerId: userId }
      }),
      
      // Sum total views across all user's listings
      this.prisma.client.listing.aggregate({
        _sum: { viewCount: true },
        where: { ownerId: userId }
      }),
      
      // Count total inquiries for user's listings
      this.prisma.client.inquiry.count({
        where: {
          listing: {
            ownerId: userId
          }
        }
      }),

      // Count listings created this month
      this.prisma.client.listing.count({
        where: { 
          ownerId: userId,
          createdAt: {
            gte: lastMonth
          }
        }
      }),

      // Count inquiries received today
      this.prisma.client.inquiry.count({
        where: {
          listing: {
            ownerId: userId
          },
          createdAt: {
            gte: today
          }
        }
      }),

      // Get total views from last week for comparison
      this.prisma.client.listing.aggregate({
        _sum: { viewCount: true },
        where: { 
          ownerId: userId,
          updatedAt: {
            gte: lastWeek
          }
        }
      }),
    ]);

    const currentTotalViews = totalViews._sum.viewCount || 0;
    const lastWeekViews = totalViewsLastWeek._sum.viewCount || 0;
    
    // Calculate view growth percentage
    const viewGrowthPercentage = lastWeekViews > 0 
      ? Math.round(((currentTotalViews - lastWeekViews) / lastWeekViews) * 100)
      : 0;

    return {
      totalListings,
      totalViews: currentTotalViews,
      totalInquiries,
      trends: {
        listingsThisMonth,
        inquiriesToday,
        viewGrowthPercentage,
      }
    };
  }
}
