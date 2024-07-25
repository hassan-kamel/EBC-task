import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private messageService: MessageService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  loading = false;

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm?.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      this._authService.login(email || '', password || '').subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful',
          });
          this._router.navigate(['/home']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Login failed', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Login failed',
          });
        },
      });
    }
  }
}
