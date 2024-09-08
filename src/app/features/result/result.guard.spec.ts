import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { resultGuard } from './result.guard';

describe('resultGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => resultGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
