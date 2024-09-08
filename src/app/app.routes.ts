import { Routes } from '@angular/router';

import { authGuard } from '~core/auth/guards/auth.guard';
import { guestGuard } from '~core/auth/guards/guest.guard';
import { resultGuard } from '~features/result/result.guard';

import config from './core/config';

export const routes: Routes = [
  {
    path: '',
    redirectTo: config.routes.welcome,
    pathMatch: 'full',
  },
  {
    path: config.routes.welcome,
    loadComponent: () => import('./features/welcome/welcome.component').then((mod) => mod.WelcomeComponent),
    title: 'IQ Challenge | Welcome',
  },
  {
    path: config.routes.login,
    canMatch: [guestGuard],
    loadComponent: () => import('./core/auth/pages/login/login.component').then((mod) => mod.LoginComponent),
    title: 'IQ Challenge | Login',
  },
  {
    path: config.routes.ready,
    canMatch: [authGuard],
    loadComponent: () => import('./features/ready/ready.component').then((mod) => mod.ReadyComponent),
    title: 'IQ Challenge | Ready',
  },
  {
    path: config.routes.challenge,
    canMatch: [authGuard],
    loadComponent: () => import('./features/challenge/challenge.component').then((mod) => mod.ChallengeComponent),
    title: 'IQ Challenge | Challenge',
  },
  {
    path: config.routes.result,
    canMatch: [authGuard],
    canDeactivate: [resultGuard],
    loadComponent: () => import('./features/result/result.component').then((mod) => mod.ResultComponent),
    title: 'IQ Challenge | Result',
  },
];
