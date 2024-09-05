import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthFacade } from '~core/auth/store/auth.facade';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authFacade = inject(AuthFacade);

  readonly loginForm = new FormGroup({
    username: new FormControl('emilys', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('emilyspass', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  submit() {
    const { username, password } = this.loginForm.value;
    this.authFacade.login(username as string, password as string);
  }
}
