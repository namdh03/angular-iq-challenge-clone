import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import config from '~core/config';
import { LogoComponent } from '~shared/components/logo/logo.component';

@Component({
  selector: 'app-ready',
  standalone: true,
  imports: [LogoComponent, RouterLink],
  templateUrl: './ready.component.html',
  styleUrl: './ready.component.css',
})
export class ReadyComponent {
  readonly config = config;
}
