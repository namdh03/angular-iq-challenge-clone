import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

import { AuthFacade } from '~core/auth/store/auth.facade';
import { LocalStorageService } from '~core/services/local-storage.service';

import { ResultComponent } from './result.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const resultGuard: CanDeactivateFn<ResultComponent> = (component, currentRoute, currentState, nextState) => {
  const localStorage = inject(LocalStorageService);
  const authFace = inject(AuthFacade);

  localStorage.removeItem('name');
  localStorage.removeItem('studentID');
  authFace.logout();

  return true;
};
