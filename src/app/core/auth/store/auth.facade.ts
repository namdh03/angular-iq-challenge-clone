import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  readonly auth$ = this.store.select(AuthSelectors.selectAuth);
  readonly isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
  readonly isLoginLoading$ = this.store.select(AuthSelectors.selectIsLoginLoading);
  readonly user$ = this.store.select(AuthSelectors.selectAuthUser);
  readonly isUserLoading$ = this.store.select(AuthSelectors.selectIsAuthUserLoading);
  readonly userError$ = this.store.select(AuthSelectors.selectAuthUserError);

  login(username: string, password: string) {
    this.store.dispatch(AuthActions.loginRequest({ username, password }));
  }

  getAuthUser() {
    this.store.dispatch(AuthActions.getAuthUserRequest());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
