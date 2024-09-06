import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

import config from '~core/config';

import { AuthFacade } from '../store/auth.facade';

export const guestGuard: CanMatchFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => (!isAuthenticated ? true : router.createUrlTree([config.routes.ready]))),
  );
};
