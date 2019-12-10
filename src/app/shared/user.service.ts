import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {User} from "../model/user";

import {JwtHelper} from "angular2-jwt";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UtilService} from "./util.service";
import {environment} from "../../environments/environment.prod";


@Injectable()
export class UserService {

  baseUrl = environment.appUrl + '/SuiviRecherches/rest/';

  user = new User();
  jwtHelper = new JwtHelper();
  isAdmin: boolean;
  roles: [];

  // email: string;
  constructor(private httpClient: HttpClient) { }

  createNewUser(email: string, password: string, role: []) {
    this.user.email = email;
    this.user.password = password;
    this.user.role = role;
    console.log(JSON.stringify(this.user));
    this.httpClient.post<User>(this.baseUrl + 'user', this.user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res) => {
        console.log('crated user');
        this.user = res;
        console.log(res);

      },
      error => UtilService.handleError(error));
  }

  login(user: User) {
    // console.log('----- user ' + JSON.stringify(user));
    // console.log('----- user.token ' + JSON.stringify(user.token));
    const accessToken = JSON.parse(user.token);
    // console.log('----- access_token ' + accessToken.access_token);
    const decodedToken = this.jwtHelper.decodeToken(accessToken.access_token as string);
    console.log(JSON.stringify(decodedToken));

    this.user = user;
    this.user.role = decodedToken.authorities;
    console.log(this.user.role)
    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN_USER');
  }

  logout() {
    this.user = null;
    this.isAdmin = false;
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.user.token && !this.isAdmin;
  }

  signInUserFirebase(email: string, passwd: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, passwd).then(
          () => {
            this.user.email = email;
            resolve(); },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUserFirebase() {
    firebase.auth().signOut();
  }
}
