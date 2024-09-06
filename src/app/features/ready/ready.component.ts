import { Component } from '@angular/core';

import { LogoComponent } from '~shared/components/logo/logo.component';

@Component({
  selector: 'app-ready',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './ready.component.html',
  styleUrl: './ready.component.css',
})
export class ReadyComponent {}
