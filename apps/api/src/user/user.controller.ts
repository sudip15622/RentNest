import { Controller, Get, Request, Post, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/auth/pipes/zod-validation.pipe';
import { UpdateUserDto, UpdateUserSchema } from './schemas/update-user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async profile(@Request() req: any) {
    const user = await this.userService.findById(req.user.id);
    if(!user) throw new NotFoundException("User not found!");

    const {password, accessToken, ...rest} = user;
    return rest;
  }

  @Post("update")
  updateUser(@Request() req: any, @Body(new ZodValidationPipe(UpdateUserSchema)) updateUserDto: UpdateUserDto) {
    return this.userService.updateBasicDetails(req.user.id, updateUserDto);
  }

  @Get('stats')
  async getUserStats(@Request() req: any) {
    return this.userService.getUserStats(req.user.id);
  }
}
