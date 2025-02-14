import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async authenticate(createAuthDto: LoginAuthDto): Promise<AuthResult> {
    const user = await this.validateUser(createAuthDto)

    if (!user) {
      throw new UnauthorizedException()
    }

    return this.signIn(user)
  }

  async validateUser(createAuthDto: LoginAuthDto): Promise<SignInData | null> {
    const user = await this.usersService.findUsersByFilter({
      email: createAuthDto.email
    })

    if (user && user.password === createAuthDto.password) {
      return {
        userId: user.id,
        email: user.email
      }
    }

    return null
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
