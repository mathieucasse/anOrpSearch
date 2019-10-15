import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME, TOKEN_NAME} from '../shared/auth.constant';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment.prod';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  static AUTH_TOKEN_URL = environment.appUrl + '/SuiviRecherches/oauth/token';

  // constructor(private httpClient: HttpClient) {
  // }

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(TOKEN_NAME)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(TOKEN_NAME);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/signin']);
  }

  login(email: string, password: string) {
    const body = `username=${email}&password=${password}&grant_type=password`;
    const headers = new HttpHeaders(
      {'Content-Type' : 'application/x-www-form-urlencoded',
               'Authorization' : 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD)
      });

    return this.httpClient.post<any>(AuthService.AUTH_TOKEN_URL, body, {headers: headers})
                          .pipe(map(res => {
                            if (res) {
                              // console.log('=====AllToken : ' + JSON.stringify(res));
                              let user = {
                                id: null,
                                email : email,
                                password: password,
                                token: JSON.stringify(res)
                              };
                              this.currentUserSubject.next(user);
                              localStorage.setItem(TOKEN_NAME, JSON.stringify(user));
                              console.log('=====user Authenticated : ' + JSON.stringify(user));
                              return user;
                            }
                          }));
  }
}
