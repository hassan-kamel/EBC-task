import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { ProductsService } from '../../services/products.service';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    SplitButtonModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(
    private _router: Router,
    private _productsService: ProductsService,
    protected authService: AuthService
  ) {}

  items: MenuItem[] | undefined;
  dashboardItems: MenuItem[] = [
    {
      separator: true,
    },
    {
      label: 'logout',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        this.authService.logout();
        this._router.navigate(['/login']);
      },
    },
  ];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home'],
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
    ];
  }

  search(event: any) {
    this._productsService.updateSearchKeyword(event.target.value);
  }

  goToDashboard() {
    this._router.navigate(['/dashboard']);
  }
}
