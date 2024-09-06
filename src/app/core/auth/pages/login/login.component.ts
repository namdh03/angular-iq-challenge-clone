import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { AuthFacade } from '~core/auth/store/auth.facade';
import { LoaderBellComponent } from '~shared/components/loader-bell/loader-bell.component';
import { LoaderSpinnerComponent } from '~shared/components/loader-spinner/loader-spinner.component';
import { LogoComponent } from '~shared/components/logo/logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, LoaderSpinnerComponent, LoaderBellComponent, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authFacade = inject(AuthFacade);

  readonly loginForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    studentId: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  vm$ = combineLatest({
    isLoginLoading: this.authFacade.isLoginLoading$,
    isUserLoading: this.authFacade.isUserLoading$,
  });

  submit() {
    if (this.loginForm.invalid) return;
    const { name, studentId } = this.loginForm.value;
    this.authFacade.login(name as string, studentId as string);
  }
}
