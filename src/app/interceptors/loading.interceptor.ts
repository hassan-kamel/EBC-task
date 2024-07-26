import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, finalize, map, tap, throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.setLoading(true, req.url);

  return next(req).pipe(
    finalize(() => loadingService.setLoading(false, req.url))
  );
};
