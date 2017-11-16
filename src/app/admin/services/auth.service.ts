import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  public BASE_URL: string = 'http://127.0.0.1:5555/api/v1/auth';

  constructor(private http: HttpClient) { 
    //no me funciona como singleton
    //localStorage.clear();
  }

  test(): string {
    return 'working routing';
  }

  login(email:string, password:string ) {

    this.logout();
    let url: string = `${this.BASE_URL}/login/`;
    return this.http.post(url, {email, password})
      .do(res => this.setSession(res))
      .shareReplay()
  } 

  private setSession(authResult) {
    console.log("Session Set");
    localStorage.setItem('id_token', authResult.token);
  } 

 public getToken():string {
    return localStorage.getItem('id_token');
  }

  public isLogged():boolean {
    if (localStorage.getItem('id_token'))
    { 
      return true 
    };
    return false;
  }

  public logout(){
    localStorage.removeItem('id_token');
  }

  public refreshToken(){
    console.log("Refreshing Token");
    const body = { token: this.getToken() };
    let url: string = `${this.BASE_URL}/token-refresh/`;
    return this.http.post(url, body).subscribe(
      (res) => {
        res => this.setSession(res)
      }
    )
  }

  login2(user) {
    
    let url: string = `${this.BASE_URL}/login/`;

    const body = { email: user.email, password: user.password };

    //Deprecated
    // let urlSearchParams = new URLSearchParams();
    // urlSearchParams.append('email', user.email);
    // urlSearchParams.append('password', user.password);

    this.http.post(url, body)
    .subscribe(
      data => {
        alert('ok');
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    )
  }

  getuseraccounts(): Observable<any> {
    
    let url: string = `${this.BASE_URL}/accounts/`;
    return this.http.get(url);

    // this.http
    // .get(url)
    // .subscribe(
    //   data => { 
    //     alert('ok'); 
    //     console.log(data);
    //   },
    //   (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       // A client-side or network error occurred. Handle it accordingly.
    //       console.log('An error occurred:', err.error.message);
    //     } else {
    //       // The backend returned an unsuccessful response code.
    //       // The response body may contain clues as to what went wrong,
    //       console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    //     }
    //   }
    // );
  }

  // register(user): Promise<any> {
  //   let url: string = `${this.BASE_URL}/register`;
  //   return this.http.post(url, user, {headers: this.headers}).toPromise();
  // }
}
