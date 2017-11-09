import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  test: string = 'just a test';

  constructor(private auth: AuthService) { }

  ngOnInit() {
    let sampleUser: any = {
      email: 'fmelendezherize@gmail.com' as string,
      password: 'Pikachu32.' as string
    };

    // this.auth.register(sampleUser)
    // .then((user) => {
    //   console.log(user.json());
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    this.auth.login(sampleUser);

    // this.auth.login(sampleUser).then((user) => {
    //   console.log(user.json());
    // })
    // .catch((err) => {
    //   console.log(err);
    //   console.log(JSON.stringify(err.json())
    // });
  }
}
