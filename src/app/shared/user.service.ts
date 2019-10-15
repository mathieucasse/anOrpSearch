import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {User} from "../model/user";

import {JwtHelper} from "angular2-jwt";


@Injectable()
export class UserService {

  user = new User();
  jwtHelper = new JwtHelper();
  isAdmin: boolean;

  // email: string;
  constructor() { }

  createNewUser(email: string, passwd: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, passwd).then(
          () => {
            this.user.email = email;
            resolve(); },
          (error) => {
            console.log('-------- AuthService.createNewUser() error' + error);
            reject(error);
          }
        );
      }
    );
  }

  login(user: User) {
    // console.log('----- user ' + JSON.stringify(user));
    // console.log('----- user.token ' + JSON.stringify(user.token));
    const accessToken = JSON.parse(user.token);
    // console.log('----- access_token ' + accessToken.access_token);
    const decodedToken = this.jwtHelper.decodeToken(accessToken.access_token as string);
    console.log(JSON.stringify(decodedToken));

    this.user = user;
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
