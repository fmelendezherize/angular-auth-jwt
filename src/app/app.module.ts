import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AuthService } from './admin/services/auth.service';
import { TokenInterceptor } from './admin/services/token.interceptor';

import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AdminModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
