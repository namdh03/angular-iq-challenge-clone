import { Action, createReducer, on } from '@ngrx/store';

import { AuthState } from '../models/auth.model';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  isLoginLoading: false,
  errorLogin: undefined,
  user: undefined,
  isUserLoading: false,
  errorUser: undefined,
};

const reducer = createReducer(
  initialState,

  // Init Auth
  on(
    AuthActions.initAuthSuccess,
    (state): AuthState => ({
      ...state,
      isInitialized: true,
    }),
  ),

  // Login
  on(
    AuthActions.loginRequest,
    (state): AuthState => ({
      ...state,
      isLoginLoading: true,
    }),
  ),
  on(
    AuthActions.loginSuccess,
    (state): AuthState => ({
      ...state,
      isLoginLoading: false,
    }),
  ),
  on(
    AuthActions.loginFailure,
    (state): AuthState => ({
      ...state,
      isLoginLoading: false,
    }),
  ),

  // Auth user
  on(
    AuthActions.getAuthUserRequest,
    (state): AuthState => ({
      ...state,
      isUserLoading: true,
    }),
  ),
  on(
    AuthActions.getAuthUserSuccess,
    (state, action): AuthState => ({
      ...state,
      user: action.user,
      isUserLoading: false,
      isAuthenticated: true,
    }),
  ),
  on(
    AuthActions.getAuthUserFailure,
    (_, action): AuthState => ({
      ...initialState,
      isUserLoading: false,
      errorUser: action.error,
    }),
  ),

  // Logout
  on(
    AuthActions.logout,
    (): AuthState => ({
      ...initialState,
      isInitialized: true,
    }),
  ),
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
