import { HttpErrorResponse } from '@angular/common/http';

export interface AuthUser {
  id: number;
}

export interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  isLoginLoading: boolean;
  errorLogin?: HttpErrorResponse;
  user?: AuthUser;
  isUserLoading: boolean;
  errorUser?: HttpErrorResponse;
}
