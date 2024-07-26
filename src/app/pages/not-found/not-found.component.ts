import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found-container">
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button pButton type="button" label="Go Home" (click)="goHome()"></button>
    </div>
  `,
  styles: [
    `
      .not-found-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
      }
      button {
        margin-top: 20px;
      }
    `,
  ],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
