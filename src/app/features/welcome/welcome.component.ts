import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import config from '~core/config';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  readonly config = config;
}
