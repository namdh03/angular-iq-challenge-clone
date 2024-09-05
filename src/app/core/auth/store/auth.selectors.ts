import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../models/auth.model';
import { AUTH_FEATURE_KEY } from './auth.reducer';

export const selectAuth = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectIsAuthenticated = createSelector(selectAuth, (state) => state.isAuthenticated);

// Login
export const selectIsLoginLoading = createSelector(selectAuth, (state) => state.isLoginLoading);

// Auth User
export const selectAuthUser = createSelector(selectAuth, (state) => state.user);
export const selectIsAuthUserLoading = createSelector(selectAuth, (state) => state.isUserLoading);
export const selectAuthUserError = createSelector(selectAuth, (state) => state.errorUser);
