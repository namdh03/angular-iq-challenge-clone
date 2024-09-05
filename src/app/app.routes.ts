import { Routes } from '@angular/router';

import { authGuard } from '~core/auth/guards/auth.guard';
import { guestGuard } from '~core/auth/guards/guest.guard';

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
  },
  {
    path: config.routes.login,
    canMatch: [guestGuard],
    loadComponent: () => import('./core/auth/pages/login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: config.routes.ready,
    canMatch: [authGuard],
    loadComponent: () => import('./features/ready/ready.component').then((mod) => mod.ReadyComponent),
  },
  {
    path: config.routes.challenge,
    loadComponent: () => import('./features/challenge/challenge.component').then((mod) => mod.ChallengeComponent),
  },
  {
    path: config.routes.result,
    loadComponent: () => import('./features/result/result.component').then((mod) => mod.ResultComponent),
  },
  {
    path: config.routes.scoreboard,
    loadComponent: () => import('./features/scoreboard/scoreboard.component').then((mod) => mod.ScoreboardComponent),
  },
];
