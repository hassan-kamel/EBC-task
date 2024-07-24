import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { activeLoginGuard } from './active-login.guard';

describe('activeLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => activeLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
