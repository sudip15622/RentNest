import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './schemas/create-user.schema';
import { UserService } from 'src/user/user.service';
import { hash, verify } from 'argon2';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const emailUser = await this.userService.findByEmail(createUserDto.email);
    const phoneUser = await this.userService.findByPhoneNumber(
      createUserDto.phoneNumber,
    );
    if (emailUser || phoneUser)
      throw new ConflictException('User already exists!');
    return await this.userService.createUser(createUserDto);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('User not found!');

    const isPasswordMatch = await verify(user.password, password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid Credentails!');

    return { id: user.id, image: user.image };
  }

  async login(userId: string, image: string) {
    const accessToken = await this.generateTokens(userId);

    const hashedAT = await hash(accessToken);
    await this.userService.updateAccessToken(userId, hashedAT);
    return {
      id: userId,
      image,
      accessToken,
    };
  }

  async generateTokens(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };

    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload),
    ]);

    return accessToken;
  }

  async validateJwtUser(userId: string, providedToken: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found!');

    // Check if user has an access token (not logged out)
    if (!user.accessToken) {
      throw new UnauthorizedException('User is logged out!');
    }

    // Verify the provided token matches the stored hashed token
    const isTokenValid = await verify(user.accessToken, providedToken);
    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid access token!');
    }

    return { id: user.id };
  }

  async signOut(userId: string) {
    return await this.userService.updateAccessToken(userId, null);
  }
}
