import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { jest } from '@jest/globals';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  const createContext = (roles?: string[]) =>
    ({
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({
          user: roles ? { roles } : undefined,
        }),
      }),
    }) as unknown as ExecutionContext;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as Reflector;

    guard = new RolesGuard(reflector);
  });

  it('should allow a user with the required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['staff']);

    expect(guard.canActivate(createContext(['staff']))).toBe(true);
  });

  it('should deny a user without the required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['staff']);

    expect(guard.canActivate(createContext(['customer']))).toBe(false);
  });

  it('should allow access when no roles are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

    expect(guard.canActivate(createContext())).toBe(true);
  });
});
