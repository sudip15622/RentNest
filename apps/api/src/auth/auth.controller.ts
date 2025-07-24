import { Body, Controller, Post, Get, Request, Res, UseGuards, UsePipes, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { CreateUserDto, CreateUserSchema } from './schemas/create-user.schema';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { Response } from 'express';
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
    return this.authService.login(req.user.id, req.user.image);
  }

  @Post("signout")
  signOut(@Req() req: any) {
    return this.authService.signOut(req.user.id);
  }
}
