import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {

  // email: string;
  constructor() { }

  createNewUser(email: string, passwd: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, passwd).then(
          () => { resolve(); },
          (error) => {
            console.log('-------- AuthService.createNewUser() error' + error);
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, passwd: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, passwd).then(
          () => { resolve(); },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
