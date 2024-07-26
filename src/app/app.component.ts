import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
  RouterOutlet,
} from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { delay, filter } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    NavbarComponent,
    ToastModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
  ],
  template: `
    @if (loading) {
    <div class="loading-container d-flex justify-content-center" #bodyy>
      <p-progressSpinner
        [style]="{ width: '4rem', height: '4rem' }"
        strokeWidth="5"
        fill="#EEEEEE"
        animationDuration="2s"
        class="spinner"
      >
      </p-progressSpinner>
    </div>
    }
    <p-confirmDialog />
    <p-toast />
    @if(showNavbar){
    <app-navbar></app-navbar>
    }
    <div style="min-height: 100vh">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .loading-container {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 5;
        pointer-events: none;
      }

      .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .loading-spinner-text {
        color: unset;
        font-size: 2rem;
        position: absolute;
          top: 45%;
      }
    `,
  ],
})
export class AppComponent {
  constructor(
    private _primengConfig: PrimeNGConfig,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _loadingService: LoadingService
  ) {}
  title = 'ebc-task';
  showNavbar = true;
  loading = false;
  private hideNavbarRoutes: string[] = ['/login', '/dashboard'];

  ngOnInit() {
    this._primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    };

    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: RouterEvent) => {
        this.checkRoute();
      });

    this.checkRoute();

    this.listenToLoading();
  }

  private checkRoute() {
    const currentRoute = this._router.url;
    this.showNavbar = !this.hideNavbarRoutes.some((route) =>
      currentRoute.includes(route)
    );
  }

  listenToLoading(): void {
    this._loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
    });
  }
}
