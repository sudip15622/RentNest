import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { CreateUserDto } from 'src/auth/schemas/create-user.schema';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor (private readonly prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto) {
        const {password, ...user} = createUserDto;
        if(password) {
            const hashedPassword = await hash(password);
            return await this.prisma.client.user.create({
                data: {...user, password: hashedPassword}
            })
        } else {
            return await this.prisma.client.user.create({
                data: {...user}
            })
        }
    }

    async findByEmail(email: string) {
        return await this.prisma.client.user.findUnique({
            where: {email: email},
        })
    }

    async findById(userId: string) {
        return await this.prisma.client.user.findUnique({
            where: {id: userId},
        })
    }

    async updateRefreshToken(userId: string, hashedRT: string | null) {
        return await this.prisma.client.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: hashedRT
            }
        })
    }
}
