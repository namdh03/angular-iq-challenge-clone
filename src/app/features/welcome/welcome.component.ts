import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import config from '~core/config';
import { ButtonComponent } from '~shared/components/button/button.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  readonly config = config;
}
