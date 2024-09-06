import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_INITIALIZER, inject, Injectable, Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, lastValueFrom, Observable, take } from 'rxjs';

import { LocalStorageService } from '~core/services/local-storage.service';

import { AuthState, AuthUser } from '../models/auth.model';
import * as AuthActions from '../store/auth.actions';
import { AuthFacade } from '../store/auth.facade';

export interface AccessData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly store = inject(Store);
  private readonly httpClient = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly authFacade = inject(AuthFacade);

  // private readonly hostUrl = this.configService.getAPIUrl();
  // private readonly clientId = this.configService.getAuthSettings().clientId;
  // private readonly clientSecret = this.configService.getAuthSettings().secretId;
  private readonly hostUrl = 'https://api-gateway.iq.hdang09.tech';

  /**
   * Returns a promise that waits until
   * refresh token and get auth user
   *
   * @returns {Promise<AuthState>}
   */
  init(): Promise<AuthState> {
    this.store.dispatch(AuthActions.initAuth());

    const authState$ = this.authFacade.auth$.pipe(
      filter((auth) => auth.isInitialized),
      take(1),
    );

    return lastValueFrom(authState$);
  }

  /**
   * Performs a request with user credentials
   * in order to get auth tokens
   *
   * @param {string} username
   * @param {string} password
   * @returns Observable<AccessData>
   */
  login(username: string, password: string): Observable<AccessData> {
    return this.httpClient.post<AccessData>(`${this.hostUrl}/user/register`, {
      name: username,
      studentID: password,
    });
  }

  /**
   * Returns authenticated user
   * based on saved access token
   *
   * @returns {Observable<AuthUser>}
   */
  getAuthUser(): Observable<AuthUser> {
    const name = this.localStorageService.getItem('name');
    const studentID = this.localStorageService.getItem('studentID');
    return this.httpClient.get<AuthUser>(`${this.hostUrl}/user/start/${name}/${studentID}`);
  }

  /**
   * Performs a request for logout authenticated user
   *
   * @param {('all' | 'allButCurrent' | 'current')} [clients='current']
   * @returns Observable<void>
   */
  logout(clients: 'all' | 'allButCurrent' | 'current' = 'current'): Observable<void> {
    const params = new HttpParams().append('clients', clients);

    return this.httpClient.get<void>(`${this.hostUrl}/auth/logout`, { params });
  }
}

export const authServiceInitProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (authService: AuthService) => () => authService.init(),
  deps: [AuthService],
  multi: true,
};
