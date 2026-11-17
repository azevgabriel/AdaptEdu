import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { parseCookie } from 'cookie';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';
import { JwtPayload } from '../interfaces/auth.interface.js';

export const SESSION_COOKIE_NAME = 'adaptedu_session';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException(
        'Acesso não autorizado. Faça login para continuar.',
      );
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret:
          process.env.JWT_SECRET || 'adaptedu_dev_jwt_secret_do_not_use_in_prod',
      });
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException(
        'Sessão inválida ou expirada. Faça login novamente.',
      );
    }
  }

  extractToken(request: any): string | null {
    // 1. Try Authorization header Bearer token
    const authHeader = request.headers?.authorization;
    if (
      authHeader &&
      typeof authHeader === 'string' &&
      authHeader.startsWith('Bearer ')
    ) {
      return authHeader.substring(7).trim();
    }

    // 2. Try HTTP-only session cookie
    const cookieHeader = request.headers?.cookie;
    if (cookieHeader && typeof cookieHeader === 'string') {
      const cookies = parseCookie(cookieHeader);
      if (cookies[SESSION_COOKIE_NAME]) {
        return cookies[SESSION_COOKIE_NAME];
      }
    }

    return null;
  }
}
