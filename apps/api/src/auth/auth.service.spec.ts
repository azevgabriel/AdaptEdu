import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { SESSION_COOKIE_NAME } from './guards/jwt-auth.guard.js';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(() => {
    prisma = {
      user: {
        upsert: vi.fn(),
        findUnique: vi.fn(),
      },
    } as unknown as PrismaService;

    jwtService = new JwtService({ secret: 'test_jwt_secret' });
    service = new AuthService(prisma, jwtService);
  });

  describe('getGoogleAuthUrl', () => {
    it('returns valid Google OAuth authorization URL', () => {
      const url = service.getGoogleAuthUrl('/minha-sala');
      expect(url).toContain('https://accounts.google.com/o/oauth2/v2/auth');
      expect(url).toContain('client_id=');
      expect(url).toContain('redirect_uri=');
      expect(url).toContain('state=');
    });

    it('returns URL without state when returnUrl is omitted', () => {
      const url = service.getGoogleAuthUrl();
      expect(url).toContain('https://accounts.google.com/o/oauth2/v2/auth');
      expect(url).not.toContain('state=');
    });
  });

  describe('exchangeGoogleCode', () => {
    it('handles mock code successfully for testing', async () => {
      const profile = await service.exchangeGoogleCode('mock_teacher_code');
      expect(profile).toHaveProperty('googleId');
      expect(profile.email).toBe('mock_teacher_code@escola.gov.br');
      expect(profile.name).toBe('Profª. Ana Silva');
    });

    it('exchanges real code with Google token endpoint', async () => {
      const mockTokenResponse = {
        ok: true,
        json: async () => ({ access_token: 'google_access_token_123' }),
      };
      const mockUserinfoResponse = {
        ok: true,
        json: async () => ({
          sub: 'google_sub_123',
          email: 'maria.souza@escola.gov.br',
          name: 'Profª Maria Souza',
          picture: 'https://example.com/avatar.jpg',
        }),
      };

      vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(mockTokenResponse as any)
        .mockResolvedValueOnce(mockUserinfoResponse as any);

      const profile = await service.exchangeGoogleCode('real_auth_code');
      expect(profile.googleId).toBe('google_sub_123');
      expect(profile.email).toBe('maria.souza@escola.gov.br');
      expect(profile.name).toBe('Profª Maria Souza');
    });

    it('throws UnauthorizedException when fetch fails or Google rejects code', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
      } as any);

      await expect(service.exchangeGoogleCode('invalid_code')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('validateOrCreateUser', () => {
    it('upserts user in Prisma with role TEACHER', async () => {
      const mockCreatedUser = {
        id: 'uuid-123',
        googleId: 'google-123',
        email: 'prof@escola.gov.br',
        name: 'Prof. Carlos',
        avatarUrl: null,
        role: 'TEACHER',
      };

      (prisma.user.upsert as any).mockResolvedValue(mockCreatedUser);

      const result = await service.validateOrCreateUser({
        googleId: 'google-123',
        email: 'prof@escola.gov.br',
        name: 'Prof. Carlos',
      });

      expect(result).toEqual(mockCreatedUser);
      expect(prisma.user.upsert).toHaveBeenCalledWith({
        where: { googleId: 'google-123' },
        update: {
          email: 'prof@escola.gov.br',
          name: 'Prof. Carlos',
          avatarUrl: undefined,
        },
        create: {
          googleId: 'google-123',
          email: 'prof@escola.gov.br',
          name: 'Prof. Carlos',
          avatarUrl: undefined,
          role: 'TEACHER',
        },
      });
    });
  });

  describe('createSessionToken & cookies', () => {
    it('creates and verifies session JWT', () => {
      const token = service.createSessionToken({
        id: 'user-abc',
        email: 'test@escola.gov.br',
        role: 'TEACHER',
      });
      expect(typeof token).toBe('string');

      const verified = jwtService.verify(token);
      expect(verified.sub).toBe('user-abc');
      expect(verified.email).toBe('test@escola.gov.br');
      expect(verified.role).toBe('TEACHER');
    });

    it('creates HTTP-only session cookie', () => {
      const cookie = service.createSessionCookie('jwt_token_sample');
      expect(cookie).toContain(`${SESSION_COOKIE_NAME}=jwt_token_sample`);
      expect(cookie).toContain('HttpOnly');
      expect(cookie).toContain('Path=/');
    });

    it('creates clear session cookie with maxAge 0', () => {
      const cookie = service.createClearSessionCookie();
      expect(cookie).toContain(`${SESSION_COOKIE_NAME}=;`);
      expect(cookie).toContain('Max-Age=0');
    });
  });

  describe('getProfile', () => {
    it('returns teacher profile when user exists', async () => {
      const mockUser = {
        id: 'user-789',
        email: 'pedagoga@escola.gov.br',
        name: 'Helena Santos',
        avatarUrl: 'https://avatar.url',
        role: 'TEACHER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      const result = await service.getProfile('user-789');
      expect(result).toEqual(mockUser);
    });

    it('throws UnauthorizedException when user does not exist', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);

      await expect(service.getProfile('unknown-id')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});

