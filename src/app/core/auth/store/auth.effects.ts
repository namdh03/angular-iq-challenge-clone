import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, exhaustMap, finalize, iif, lastValueFrom, map, of, switchMap, tap } from 'rxjs';

import config from '~core/config';
import { LocalStorageService } from '~core/services/local-storage.service';
import { TokenStorageService } from '~core/services/token-storage.service';

import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';
import { AuthFacade } from './auth.facade';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly actions$ = inject(Actions);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly tokenStorageService = inject(TokenStorageService);
  private readonly authService = inject(AuthService);
  private readonly authFacade = inject(AuthFacade);

  readonly onInit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.initAuth),
      exhaustMap(() => {
        // const accessToken = this.tokenStorageService.getAccessToken();
        const name = this.localStorageService.getItem('name');
        const studentID = this.localStorageService.getItem('studentID');

        return iif(
          // Condition: If accessToken exists
          // () => !!accessToken,
          // Condition: If name and studentID exists
          () => !!(name && studentID),
          // Observable to execute if condition is true
          this.authService.getAuthUser().pipe(
            switchMap((user) =>
              concat(of(AuthActions.initAuthSuccess()), of(AuthActions.getAuthUserSuccess({ user }))),
            ),
            catchError((error) => of(AuthActions.initAuthSuccess(), AuthActions.getAuthUserFailure({ error }))),
          ),
          // Observable to execute if condition is false
          of(AuthActions.initAuthSuccess()),
        );
      }),
    );
  });

  readonly login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((credentials) =>
        this.authService.login(credentials.username, credentials.password).pipe(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          map((data) => {
            // Save name and studentID
            this.localStorageService.setItem('name', credentials.username);
            this.localStorageService.setItem('studentID', credentials.password);
            // save tokens
            // this.tokenStorageService.saveTokens(data.token, data.refreshToken);
            // trigger login success action
            return AuthActions.loginSuccess();
          }),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
        ),
      ),
    );
  });

  readonly onLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(() => AuthActions.getAuthUserRequest()),
      tap(() => {
        const authState$ = this.authFacade.auth$.pipe(
          tap((data) => {
            if (data.user && data.isAuthenticated) {
              // redirect to return url or home
              this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['returnUrl'] || config.routes.ready, {
                replaceUrl: true,
              });
            }
          }),
        );

        return lastValueFrom(authState$);
      }),
    );
  });

  readonly onLoginFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap((error) => {
          alert(error.error.error?.message);
          this.localStorageService.removeItem('name');
          this.localStorageService.removeItem('studentID');
          this.tokenStorageService.removeTokens();
        }),
      );
    },
    { dispatch: false },
  );

  readonly getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.getAuthUserRequest),
      exhaustMap(() =>
        this.authService.getAuthUser().pipe(
          map((user) => AuthActions.getAuthUserSuccess({ user })),
          catchError((error) => of(AuthActions.getAuthUserFailure({ error }))),
        ),
      ),
    );
  });

  readonly logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        exhaustMap(() => {
          this.router.navigateByUrl(config.routes.root);
          return this.authService.logout().pipe(finalize(() => this.tokenStorageService.removeTokens()));
        }),
      );
    },
    { dispatch: false },
  );
}
