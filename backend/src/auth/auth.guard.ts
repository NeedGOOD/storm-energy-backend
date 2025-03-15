import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing or invalid');
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      request.user = {
        id: tokenPayload.sub,
        email: tokenPayload.email,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('GUARD ERROR');
    }
  }
}
