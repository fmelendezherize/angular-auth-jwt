import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
//import { URLSearchParams } from '@angular/http';

//import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private BASE_URL: string = 'http://127.0.0.1:5555/api/v1/auth';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  test(): string {
    return 'working routing';
  }

  login(user) {
    
    //let url: string = `${this.BASE_URL}/login/`;

    let url: string = 'http://127.0.0.1:5555/api/v1/auth/accounts/';

    this.http
    .get(url)
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
    );

    // let urlSearchParams = new URLSearchParams();
    // urlSearchParams.append('email', user.email);
    // urlSearchParams.append('password', user.password);
  
    // //return this.http.post(url, urlSearchParams).toPromise();

    // this.http.get(url).subscribe(
    //   data => {
    //     alert('ok');
    //   },
    //   error => {
    //     console.log(error);
    //     console.log(JSON.stringify(error.json()));
    //   }
    // )

    // this.http.post(url, urlSearchParams).subscribe(
    //   data => {
    //     alert('ok');
    //   },
    //   error => {
    //     console.log(JSON.stringify(error.json()));
    //   }
    // )
  }

  // register(user): Promise<any> {
  //   let url: string = `${this.BASE_URL}/register`;
  //   return this.http.post(url, user, {headers: this.headers}).toPromise();
  // }
}
