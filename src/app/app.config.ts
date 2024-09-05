import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { authInterceptor } from '~core/auth/interceptors/auth.interceptor';
import { authServiceInitProvider } from '~core/auth/services/auth.service';
import { AuthEffects } from '~core/auth/store/auth.effects';
import { authReducer } from '~core/auth/store/auth.reducer';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    authServiceInitProvider,
  ],
};
