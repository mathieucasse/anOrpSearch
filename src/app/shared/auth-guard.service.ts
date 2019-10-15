import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  // constructor(private router: Router) { }

  // canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // return new Promise(
    //   (resolve) => {
    //     firebase.auth().onAuthStateChanged(
    //       (user) => {
    //         if (user) {
    //           resolve(true);
    //         } else {
    //           this.router.navigate(['/auth', 'signin']);
    //           resolve(false);
    //         }
    //       }
    //     );
    //   }
    // );
  // }
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    console.log('canActivate currentUser = ' + JSON.stringify(currentUser));
    if (currentUser) {
      // logged in so return true
      console.log('User logged !!!');
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth', 'signin']);
    return false;
  }
}
