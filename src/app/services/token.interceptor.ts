import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public inj: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const auth = this.inj.get(AuthService);
    let token = auth.getToken();
    if (token != null){
        request = request.clone({
            setHeaders: {
              Authorization: `JWT ${token}`
            }
          });
    }
    return next.handle(request);
  }
}