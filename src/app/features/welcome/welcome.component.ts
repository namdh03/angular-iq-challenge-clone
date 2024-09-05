import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';

import { AuthFacade } from '~core/auth/store/auth.facade';
import config from '~core/config';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  private readonly authFacade = inject(AuthFacade);
  readonly config = config;

  vm$ = combineLatest({
    user: this.authFacade.user$,
    userError: this.authFacade.userError$,
  });
}
