import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authService.currentUserValue;
    console.log('Intercept -> ');
    if (currentUser && currentUser.token) {
      console.log('Intercept -> adding Header  : ' + currentUser.token);
      const accessToken = JSON.parse(currentUser.token);
      console.log('----- access_token ' + accessToken.access_token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken.access_token}`
        }
      });
    }

    return next.handle(request);
  }
}
