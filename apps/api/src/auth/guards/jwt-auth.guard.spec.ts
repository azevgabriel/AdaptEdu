import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { stringifySetCookie } from 'cookie';
import { JwtAuthGuard, SESSION_COOKIE_NAME } from './jwt-auth.guard.js';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;
  let jwtService: JwtService;

  beforeEach(() => {
    reflector = new Reflector();
    jwtService = new JwtService({ secret: 'test_secret' });
    guard = new JwtAuthGuard(reflector, jwtService);
  });

  function createMockContext(request: any): ExecutionContext {
    return {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => ({}),
      }),
    } as unknown as ExecutionContext;
  }

  it('allows access if route is decorated with @Public()', async () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    const context = createMockContext({});

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('allows access and attaches user when valid Bearer token is provided', async () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    const payload = { sub: 'user-123', email: 'prof@escola.gov.br', role: 'TEACHER' };
    const token = await jwtService.signAsync(payload, { secret: 'test_secret' });

    const request = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      user: null as any,
    };
    const context = createMockContext(request);

    vi.stubEnv('JWT_SECRET', 'test_secret');
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(request.user).toMatchObject(payload);
  });

  it('allows access and attaches user when valid cookie session token is provided', async () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    const payload = { sub: 'user-456', email: 'prof2@escola.gov.br', role: 'TEACHER' };
    const token = await jwtService.signAsync(payload, { secret: 'test_secret' });

    const cookieStr = stringifySetCookie({
      name: SESSION_COOKIE_NAME,
      value: token,
    });
    const request = {
      headers: {
        cookie: cookieStr,
      },
      user: null as any,
    };
    const context = createMockContext(request);

    vi.stubEnv('JWT_SECRET', 'test_secret');
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(request.user).toMatchObject(payload);
  });

  it('throws UnauthorizedException when no token is present', async () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    const context = createMockContext({ headers: {} });

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('throws UnauthorizedException when token is invalid or expired', async () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    const context = createMockContext({
      headers: {
        authorization: 'Bearer invalid.jwt.token',
      },
    });

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('returns null from extractToken when neither header nor cookie is present', () => {
    const request = { headers: {} };
    expect(guard.extractToken(request)).toBeNull();
  });
});
