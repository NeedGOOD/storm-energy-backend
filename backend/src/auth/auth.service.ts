import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

type SignInData = { userId: number; email: string }
type AuthResult = { accessToken: string; userId: number; email: string }

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async authenticate(loginAuthDto: LoginAuthDto): Promise<AuthResult> {
    const user = await this.validateUser(loginAuthDto);

    if (!user) {
      throw new UnauthorizedException('Password does not match.');
    }

    return this.signIn(user);
  }

  async validateUser(loginAuthDto: LoginAuthDto): Promise<SignInData | null> {
    const user = await this.usersService.findUserByFilter({
      email: loginAuthDto.email
    });

    if (user && user.password === loginAuthDto.password) {
      return {
        userId: user.id,
        email: user.email
      };
    }

    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      email: user.email
    }

    const accessToken = await this.jwtService.signAsync(tokenPayload)

    return { accessToken, userId: user.userId, email: user.email }
  }
}
