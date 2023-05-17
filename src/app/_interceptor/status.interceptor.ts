import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StatusInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token
    document.cookie.split('; ').forEach(el => {
      const tok = el.split('token=')
      if ( tok.length == 2 ) {
        token = tok[1]
      }
    })
    request = request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
      reportProgress: true
    });
    console.log("outgoing request",request);
    return next.handle(request)
    .pipe( catchError( err => {
      if ( err instanceof HttpErrorResponse ) {
        // debugger
        console.table(err)
        if ( err.status === 401 ) {
          // call a logic function
        }
      }
      return throwError(err);
    }));
  }
}
