import { describe, it, expect } from 'vitest';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Public, IS_PUBLIC_KEY } from './public.decorator.js';
import { getCurrentUserByContext } from './current-user.decorator.js';

describe('Auth Decorators', () => {
  it('Public decorator sets isPublic metadata', () => {
    class TestClass {
      @Public()
      testMethod() {}
    }

    const reflector = new Reflector();
    const isPublic = reflector.get<boolean>(
      IS_PUBLIC_KEY,
      TestClass.prototype.testMethod,
    );
    expect(isPublic).toBe(true);
  });

  it('CurrentUser extracts user from request context', () => {
    const mockUser = { sub: 'u1', email: 'test@escola.gov.br', role: 'TEACHER' };
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: mockUser }),
      }),
    } as unknown as ExecutionContext;

    const user = getCurrentUserByContext(null, mockContext);
    expect(user).toEqual(mockUser);
  });
});
