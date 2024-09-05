import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import config from '~core/config';

import { AuthFacade } from '../store/auth.facade';

export const authGuard: CanMatchFn = (route, segments: UrlSegment[]): Observable<boolean | UrlTree> => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) =>
      isAuthenticated
        ? true
        : router.createUrlTree([config.routes.root, config.routes.login], {
            queryParams: { returnUrl: segments.join(config.routes.root) },
          }),
    ),
  );
};
