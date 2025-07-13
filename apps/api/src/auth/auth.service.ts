import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './schemas/create-user.schema';
import { UserService } from 'src/user/user.service';
import { hash, verify } from 'argon2';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './configs/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) throw new ConflictException('User already exists!');
    return await this.userService.createUser(createUserDto);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('User not found!');
    if (!user.password) throw new UnauthorizedException('Invalid Credentails!');

    const isPasswordMatch = await verify(user.password, password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid Credentails!');

    return { id: user.id, image: user.image };
  }

  async login(userId: string, image: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const hashedRT = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRT);
    return {
      id: userId,
      image,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found!');

    return { id: user.id };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    if(!user.refreshToken) throw new UnauthorizedException("Refresh token not found!");

    const refreshTokenMatched = await verify(user.refreshToken, refreshToken);

    if (!refreshTokenMatched)
      throw new UnauthorizedException('Invalid refresh token!');

    return { id: user.id };
  }

  async refreshToken(userId: string, image: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const hashedRT = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRT);
    return {
      id: userId,
      image,
      accessToken,
      refreshToken,
    };
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;
    return await this.userService.createUser(googleUser);
  }

  async signOut(userId: string) {
    return await this.userService.updateRefreshToken(userId, null)
  }
}
