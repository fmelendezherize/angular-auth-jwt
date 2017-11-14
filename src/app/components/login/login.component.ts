import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private auth: AuthService,
              private fb:FormBuilder,
              private router: Router) { 
                
                this.form = this.fb.group(
                  {                                           
                    email: ['',Validators.required],
                    password: ['',Validators.required]
                  });
              }

  user: User = new User();

  ngOnInit() {
    // let sampleUser: any = {
    //   email: 'fmelendezherize@gmail.com' as string,
    //   password: 'Pikachu321.' as string
    // };
  }

  onLogin() {
      this.auth.login2(this.user);
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
        this.auth.login(val.email, val.password)
            .subscribe();
            //     () => {
            //         console.log("User is logged in");
            //         this.router.navigateByUrl('/');
            //     }
            // );
    }
  }
}
