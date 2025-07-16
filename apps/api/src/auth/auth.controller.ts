import { Body, Controller, Post, Get, Request, Res, UseGuards, UsePipes, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { CreateUserDto, CreateUserSchema } from './schemas/create-user.schema';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("signup")
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("signin")
  login(@Request() req: any) {
    return this.authService.login(req.user.id, req.user.image, req.user.role);
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user.id, req.user.image);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get("google/login")
  googleLogin(@Req() req: any) {
    // The guard will handle the redirect to Google with the state parameter
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  async googleCallback (@Request() req: any, @Res() res: Response) {
    try {
      const user = req.user;
      const response = await this.authService.login(user.id, user.image, user.role);
      const {id, image, role, accessToken, refreshToken} = response;
      
      // Parse the OAuth state to get redirect information
      let redirectTo = '/';
      if (user.oauthState) {
        try {
          const decodedState = Buffer.from(user.oauthState, 'base64').toString('utf-8');
          const stateData = JSON.parse(decodedState);
          redirectTo = stateData.redirectTo || '/';
        } catch (error) {
          console.error('Error parsing OAuth state:', error);
        }
      }

      res.redirect(
        `http://localhost:3000/api/auth/google/callback?redirectTo=${encodeURIComponent(redirectTo)}&id=${encodeURIComponent(id)}&image=${encodeURIComponent(image)}&role=${encodeURIComponent(role)}&accessToken=${accessToken}&refreshToken=${refreshToken}`,
      );
    } catch (error) {
      console.error('Google auth callback error:', error);
      res.redirect(`http://localhost:3000/login?error=auth_failed`);
    }
  }

  @Post("signout")
  signOut(@Req() req: any) {
    return this.authService.signOut(req.user.id);
  }
}
