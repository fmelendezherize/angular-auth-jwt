import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from '../admin/components/login/login.component';
import { AccountsComponent } from '../admin/components/accounts/accounts.component'

// import { AuthService } from '../admin/services/auth.service';
// import { TokenInterceptor } from '../admin/services/token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'accounts', component: AccountsComponent }
    ])
  ],
  declarations: [
    LoginComponent,
    AccountsComponent
  ]
})
export class AdminModule { 
    constructor(){ }
}
