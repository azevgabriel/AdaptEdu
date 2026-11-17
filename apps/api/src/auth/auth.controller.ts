import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from './decorators/public.decorator.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import type { JwtPayload } from './interfaces/auth.interface.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * GET /auth/google
   * Initiates Google OAuth consent screen by redirecting educator to Google.
   */
  @Public()
  @Get('google')
  googleAuth(
    @Query('returnUrl') returnUrl: string | undefined,
    @Res() res: any,
  ) {
    const url = this.authService.getGoogleAuthUrl(returnUrl);
    res.writeHead(302, { Location: url });
    res.end();
  }

  /**
   * GET /auth/google/callback
   * Handles Google OAuth callback, verifies profile, syncs user with Prisma,
   * generates session JWT in an HTTP-only cookie, and redirects to frontend.
   */
  @Public()
  @Get('google/callback')
  async googleAuthCallback(
    @Query('code') code: string | undefined,
    @Query('state') state: string | undefined,
    @Res() res: any,
  ) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const returnUrl = state ? decodeURIComponent(state) : '/minha-sala';

    if (!code) {
      const errorMsg = encodeURIComponent('Código de autenticação ausente');
      res.writeHead(302, {
        Location: `${frontendUrl}/login?error=${errorMsg}`,
      });
      res.end();
      return;
    }

    try {
      const profile = await this.authService.exchangeGoogleCode(code);
      const user = await this.authService.validateOrCreateUser(profile);
      const token = this.authService.createSessionToken(user);
      const cookie = this.authService.createSessionCookie(token);

      const targetPath = returnUrl.startsWith('/') ? returnUrl : `/${returnUrl}`;
      res.writeHead(302, {
        'Set-Cookie': cookie,
        Location: `${frontendUrl}${targetPath}`,
      });
      res.end();
    } catch {
      const errorMsg = encodeURIComponent(
        'Falha na autenticação com o Google',
      );
      res.writeHead(302, {
        Location: `${frontendUrl}/login?error=${errorMsg}`,
      });
      res.end();
    }
  }

  /**
   * GET /auth/me
   * Returns current authenticated teacher profile.
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: JwtPayload) {
    return this.authService.getProfile(user.sub);
  }

  /**
   * POST /auth/logout
   * Invalidates session by clearing the HTTP-only session cookie.
   */
  @Public()
  @Post('logout')
  logout(@Res({ passthrough: true }) res: any) {
    const clearCookie = this.authService.createClearSessionCookie();
    res.setHeader('Set-Cookie', clearCookie);
    return {
      success: true,
      message: 'Sessão encerrada com sucesso.',
    };
  }
}
