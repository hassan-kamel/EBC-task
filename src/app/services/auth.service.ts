import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = environment.baseUrl + '/auth/login';

  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { email, password };
    return this.http.post<LoginResponse>(this.loginUrl, body, { headers });
  }

  logout() {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Are you sure you want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        localStorage.removeItem('token');

        this.messageService.add({
          severity: 'info',
          summary: 'Logged Out',
          detail: 'You have successfully logged out',
        });

        this.router.navigate(['/login']);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelled',
          detail: 'Logout cancelled',
        });
      },
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
