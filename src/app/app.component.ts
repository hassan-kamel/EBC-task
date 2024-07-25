import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, NavbarComponent, ToastModule],
  template: `
    <p-toast />
    @if(showNavbar){
    <app-navbar></app-navbar>
    }
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  constructor(private _primengConfig: PrimeNGConfig, private router: Router) {
    this.router.events.subscribe((event: any) => {
      // Check the current route and hide navbar if it's the login page
      if (event.url) {
        this.showNavbar = !event.url.includes('/login');
      }
    });
  }
  title = 'ebc-task';
  showNavbar = true;

  ngOnInit() {
    this._primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    };
  }
}
