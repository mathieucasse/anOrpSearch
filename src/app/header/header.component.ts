import { Component, OnInit} from '@angular/core';
import { UserService } from '../shared/user.service';
import {AuthService} from "../shared/auth.service";
import {Subscription} from "rxjs";
import {User} from "../model/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  authUser: User;
  authUserSubscription: Subscription;

	constructor(private userService: UserService,
              private authService: AuthService) { }

	ngOnInit() {
    this.authUserSubscription = this.authService.currentUser.subscribe(authUser => {
      this.authUser = authUser;
    });
	}

	onSignOut() {
		this.userService.logout();
    this.authService.logout();
	}

	isAdmin(){
	  return this.userService.isAdminUser();
  }

	isStillAuth(){
    return this.isAuth = (this.authUser) ? true : false;
  }
}
