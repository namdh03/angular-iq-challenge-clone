import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { AuthUser } from '../models/auth.model';

// Init Auth
export const initAuth = createAction('[Auth] Init Auth');
export const initAuthSuccess = createAction('[Auth] Init Auth Success');

// Login
export const loginRequest = createAction('[Auth] Login Request', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: HttpErrorResponse }>());

// Auth User: me
export const getAuthUserRequest = createAction('[Auth] Auth User Request');
export const getAuthUserSuccess = createAction('[Auth] Auth User Success', props<{ user: AuthUser }>());
export const getAuthUserFailure = createAction('[Auth] Auth User Failure', props<{ error: HttpErrorResponse }>());

// Logout
export const logout = createAction('[Auth] Logout');
