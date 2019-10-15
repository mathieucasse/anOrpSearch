import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePipe } from '@angular/common'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RechercheComponent } from './recherche/recherche.component';
import { RechercheListComponent } from './recherche-list/recherche-list.component';
import { RechercheService } from './shared/recherche.service';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { UserService } from './shared/user.service';
import { AuthGuardService } from './shared/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RechercheHistComponent } from './recherche-hist/recherche-hist.component';
import { RechercheEventComponent } from './recherche-event/recherche-event.component';
import { EventAuditComponent } from './event-audit/event-audit.component';
import {AuthService} from "./shared/auth.service";
import {JwtInterceptor} from "./shared/jwt.interceptor";
import {ErrorInterceptor} from "./shared/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    RechercheComponent,
    RechercheListComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    RechercheHistComponent,
    RechercheEventComponent,
    EventAuditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UserService,
    AuthGuardService,
    RechercheService,
    DatePipe,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
