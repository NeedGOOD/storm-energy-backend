import { Controller, Post, Body, UseGuards, Get, NotImplementedException, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.authenticate(loginAuthDto);
  }

  // Test version
  @UseGuards(AuthGuard)
  @Get('me')
  async getUserInfo(@Request() request) {
    return request.user
  }
}
