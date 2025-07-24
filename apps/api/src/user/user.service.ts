import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { CreateUserDto } from 'src/auth/schemas/create-user.schema';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
