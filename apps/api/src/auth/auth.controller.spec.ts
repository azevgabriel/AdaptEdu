import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(() => {
    authService = {
      getGoogleAuthUrl: vi.fn().mockReturnValue('https://accounts.google.com/auth'),
      exchangeGoogleCode: vi.fn(),
      validateOrCreateUser: vi.fn(),
      createSessionToken: vi.fn(),
      createSessionCookie: vi.fn().mockReturnValue('adaptedu_session=token; HttpOnly'),
      createClearSessionCookie: vi.fn().mockReturnValue('adaptedu_session=; Max-Age=0'),
      getProfile: vi.fn(),
    } as unknown as AuthService;

    controller = new AuthController(authService);
  });

  describe('GET /auth/google', () => {
    it('redirects to Google OAuth consent URL', () => {
      const mockRes = {
        writeHead: vi.fn(),
        end: vi.fn(),
      };

      controller.googleAuth('/minha-sala', mockRes);

      expect(authService.getGoogleAuthUrl).toHaveBeenCalledWith('/minha-sala');
      expect(mockRes.writeHead).toHaveBeenCalledWith(302, {
        Location: 'https://accounts.google.com/auth',
      });
      expect(mockRes.end).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /auth/google/callback', () => {
    it('redirects to login with error if code is missing', async () => {
      const mockRes = {
        writeHead: vi.fn(),
        end: vi.fn(),
      };

      await controller.googleAuthCallback(undefined, undefined, mockRes);

      expect(mockRes.writeHead).toHaveBeenCalledWith(302, {
        Location: expect.stringContaining('/login?error='),
      });
      expect(mockRes.end).toHaveBeenCalledTimes(1);
    });

    it('exchanges code, sets session cookie and redirects to destination', async () => {
      const mockRes = {
        writeHead: vi.fn(),
        end: vi.fn(),
      };

      (authService.exchangeGoogleCode as any).mockResolvedValue({
        googleId: 'g-123',
        email: 'prof@escola.gov.br',
        name: 'Prof. Lucas',
      });
      (authService.validateOrCreateUser as any).mockResolvedValue({
        id: 'u-123',
        email: 'prof@escola.gov.br',
        role: 'TEACHER',
      });
      (authService.createSessionToken as any).mockReturnValue('jwt_abc');

      await controller.googleAuthCallback('valid_code', '%2Fminha-sala', mockRes);

      expect(mockRes.writeHead).toHaveBeenCalledWith(302, {
        'Set-Cookie': 'adaptedu_session=token; HttpOnly',
        Location: expect.stringContaining('/minha-sala'),
      });
      expect(mockRes.end).toHaveBeenCalledTimes(1);
    });

    it('redirects to login with error when exchange fails', async () => {
      const mockRes = {
        writeHead: vi.fn(),
        end: vi.fn(),
      };

      (authService.exchangeGoogleCode as any).mockRejectedValue(
        new Error('Network error'),
      );

      await controller.googleAuthCallback('failing_code', undefined, mockRes);

      expect(mockRes.writeHead).toHaveBeenCalledWith(302, {
        Location: expect.stringContaining('/login?error='),
      });
      expect(mockRes.end).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /auth/me', () => {
    it('returns teacher profile from authService', async () => {
      const mockProfile = {
        id: 'u-999',
        name: 'Professora Maria',
        email: 'maria@escola.gov.br',
        role: 'TEACHER',
      };
      (authService.getProfile as any).mockResolvedValue(mockProfile);

      const result = await controller.getMe({
        sub: 'u-999',
        email: 'maria@escola.gov.br',
        role: 'TEACHER',
      });

      expect(result).toEqual(mockProfile);
      expect(authService.getProfile).toHaveBeenCalledWith('u-999');
    });
  });

  describe('POST /auth/logout', () => {
    it('sets clear cookie header and returns success message in Portuguese', () => {
      const mockRes = {
        setHeader: vi.fn(),
      };

      const result = controller.logout(mockRes);

      expect(mockRes.setHeader).toHaveBeenCalledWith(
        'Set-Cookie',
        'adaptedu_session=; Max-Age=0',
      );
      expect(result).toEqual({
        success: true,
        message: 'Sessão encerrada com sucesso.',
      });
    });
  });
});
