import { Body, Controller, Post, Get, Request, Res, UseGuards, UsePipes, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { CreateUserDto, CreateUserSchema } from './schemas/create-user.schema';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  login(@Request() req: any) {
    const {id, image} = req.user;
    return this.authService.login(id, image);
  }

  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user.id, req.user.image);
  }

  @UseGuards(GoogleAuthGuard)
  @Get("google/login")
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  async googleCallback (@Request() req: any, @Res() res: Response) {
    const response = await this.authService.login(req.user.id, req.user.image);

    const {id, image, accessToken, refreshToken} = response;

    res.redirect(
      `http://localhost:3000/api/auth/google/callback?id=${id}&image=${image}&accessToken=${accessToken}&refreshToken=${refreshToken}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post("signout")
  signOut(@Req() req: any) {
    return this.authService.signOut(req.user.id);
  }
}
