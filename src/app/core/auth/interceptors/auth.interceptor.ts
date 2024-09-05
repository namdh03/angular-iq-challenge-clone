import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';

import { TokenStorageService } from '~core/services/token-storage.service';

import { AuthFacade } from '../store/auth.facade';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorageService = inject(TokenStorageService);
  const authFacade = inject(AuthFacade);

  const accessToken = tokenStorageService.getAccessToken();

  if (accessToken) {
    // Add the Authorization header to the request
    req = req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // try to avoid errors on logout
      // therefore we check the url path of '/auth/'
      const ignoreAPIs = ['/auth/'];
      if (ignoreAPIs.some((api) => req.url.includes(api))) {
        return throwError(() => error);
      }

      // Handle global error status
      switch (error.status) {
        case 401:
          return handle401();
        // Add more error status handling here (e.g. 403)
        default:
          // Rethrow the error as is
          return throwError(() => error);
      }
    }),
  );

  function handle401() {
    authFacade.logout();
    return EMPTY;
  }
};
