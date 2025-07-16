import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  profile(@Request() req: any) {
    return {
      message: `THis is your user id: ${req.user.id}`,
    };
  }
}
