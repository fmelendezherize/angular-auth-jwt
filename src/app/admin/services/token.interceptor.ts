import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public inj: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const authService = this.inj.get(AuthService);

    if (request.url == `${authService.BASE_URL}/token-refresh/`){
      return next.handle(request);  
    }

    if (authService.isLogged()){
      authService.refreshToken()
      .subscribe(
        data => {
          request = request.clone({
            setHeaders: {
              Authorization: `JWT ${authService.getToken()}`
            }
          });
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error.detail}`);
          }
        }
    }
    return next.handle(request);
  }
}