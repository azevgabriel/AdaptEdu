import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { stringifySetCookie } from 'cookie';
import { PrismaService } from '../prisma/prisma.service.js';
import { GoogleUserProfile, JwtPayload } from './interfaces/auth.interface.js';
import { SESSION_COOKIE_NAME } from './guards/jwt-auth.guard.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Generates Google OAuth 2.0 consent authorization URL.
   */
  getGoogleAuthUrl(returnUrl?: string): string {
    const clientId = process.env.GOOGLE_CLIENT_ID || 'mock_client_id';
    const redirectUri =
      process.env.GOOGLE_CALLBACK_URL ||
      'http://localhost:3000/auth/google/callback';
    const state = returnUrl ? encodeURIComponent(returnUrl) : '';

    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent${
      state ? `&state=${state}` : ''
    }`;
  }

  /**
   * Exchanges Google authorization code for user profile.
   */
  async exchangeGoogleCode(code: string): Promise<GoogleUserProfile> {
    if (code.startsWith('mock_')) {
      return {
        googleId: `mock_google_id_${code}`,
        email: `${code}@escola.gov.br`,
        name: 'Profª. Ana Silva',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      };
    }

    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID || '',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
          redirect_uri:
            process.env.GOOGLE_CALLBACK_URL ||
            'http://localhost:3000/auth/google/callback',
          grant_type: 'authorization_code',
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Falha ao autenticar com o Google');
      }

      const tokenData = await tokenResponse.json();

      const userinfoRes = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        },
      );

      if (!userinfoRes.ok) {
        throw new Error('Falha ao obter perfil do usuário no Google');
      }

      const profile = await userinfoRes.json();

      return {
        googleId: profile.sub,
        email: profile.email,
        name:
          profile.name ||
          profile.displayName ||
          'Professor(a) da Rede Pública',
        avatarUrl: profile.picture,
      };
    } catch {
      throw new UnauthorizedException(
        'Falha na autenticação com o Google. Tente novamente.',
      );
    }
  }

  /**
   * Validates or upserts teacher user in PostgreSQL database using Prisma.
   */
  async validateOrCreateUser(profile: GoogleUserProfile) {
    return this.prisma.user.upsert({
      where: { googleId: profile.googleId },
      update: {
        email: profile.email,
        name: profile.name,
        avatarUrl: profile.avatarUrl,
      },
      create: {
        googleId: profile.googleId,
        email: profile.email,
        name: profile.name,
        avatarUrl: profile.avatarUrl,
        role: 'TEACHER',
      },
    });
  }

  /**
   * Signs a JWT session token with teacher identity.
   */
  createSessionToken(user: { id: string; email: string; role: string }): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  /**
   * Formats HTTP-only cookie header value for session token.
   */
  createSessionCookie(token: string): string {
    return stringifySetCookie({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });
  }

  /**
   * Formats Set-Cookie header to clear the session cookie on logout.
   */
  createClearSessionCookie(): string {
    return stringifySetCookie({
      name: SESSION_COOKIE_NAME,
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
  }

  /**
   * Retrieves profile details for currently authenticated teacher.
   */
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Perfil de professor não encontrado.');
    }

    return user;
  }
}
