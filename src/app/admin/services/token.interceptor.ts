import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public inj: Injector, public router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const authService = this.inj.get(AuthService);

    if (request.url == `${authService.BASE_URL}/token-refresh/`){
      return next.handle(request);  
    }

    authService.refreshToken();

    if (authService.isLogged()){
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${authService.getToken()}`
        }
      });
    }

    console.log("Call to " + request.url);
    return next.handle(request)
      .catch((err) => {
        if (err.status == 401){
          //Signature has expired
          this.router.navigate(["/login"]);
        }
        return Observable.throw(err);
      })
    }
}
