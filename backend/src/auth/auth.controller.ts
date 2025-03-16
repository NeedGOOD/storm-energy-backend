import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) { }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.authenticate(loginAuthDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }
}
