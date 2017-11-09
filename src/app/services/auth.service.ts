import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class AuthService {

  private BASE_URL: string = 'http://127.0.0.1:5555/api/v1/auth';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  test(): string {
    return 'working routing';
  }

  login(user) {
    
    //let url: string = `${this.BASE_URL}/login/`;

    let url: string = 'http://127.0.0.1:5555/api/v1/auth/accounts/';

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', user.email);
    urlSearchParams.append('password', user.password);

    //return this.http.post(url, urlSearchParams).toPromise();

    this.http.get(url).subscribe(
      data => {
        alert('ok');
      },
      error => {
        console.log(error);
        console.log(JSON.stringify(error.json()));
      }
    )

    // this.http.post(url, urlSearchParams).subscribe(
    //   data => {
    //     alert('ok');
    //   },
    //   error => {
    //     console.log(JSON.stringify(error.json()));
    //   }
    // )
  }

  register(user): Promise<any> {
    let url: string = `${this.BASE_URL}/register`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
}
