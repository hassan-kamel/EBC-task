import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { globalHttpInterceptor } from './interceptors/global-http.interceptor';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(BrowserAnimationsModule, ToastModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(
      withInterceptors([
        globalHttpInterceptor,
        jwtInterceptor,
        loadingInterceptor,
      ])
    ),
    ConfirmationService,
    MessageService,
  ],
};
