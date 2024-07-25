import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const globalHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error?.errors?.length > 0) {
        error.error?.errors?.forEach((element: any) => {
          errorMsg += `Message: ${element?.msg}\n`;
        });
      } else {
        errorMsg = `Error: ${error.error.message}`;
      }

      messageService.add({
        severity: 'error',
        summary: error.error.status || '',
        detail: errorMsg,
      });
      return throwError(() => new Error(errorMsg));
    })
  );
};
