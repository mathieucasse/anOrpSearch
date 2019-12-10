import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import {StaticlistsService} from "../../shared/staticlists.service";
import {UtilService} from "../../shared/util.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  	signUpForm: FormGroup;
	errorMessage: string;
  allRoles = this.staticlistsService.allRoles;



	constructor(private formBuilder: FormBuilder,
							      private authService: UserService,
							      private staticlistsService : StaticlistsService,
							      private router: Router) { }

	ngOnInit() {
	  this.signUpForm = null;
		this.initForm();
	}

	initForm() {
		this.signUpForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			passwd: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      roles: ['', Validators.required]
		});
	}

	onSubmit() {
		console.log('-------- signup.onsubmit() called');
		const email = this.signUpForm.get('email').value;
		const passwd = this.signUpForm.get('passwd').value;
    const roles = this.signUpForm.get('roles').value;
		console.log('-------- signup.onsubmit() called wtith ' + email + ' - ' + passwd + ' - ' + roles);
    console.log('-------- signup.onsubmit() typeof roles ' + typeof roles);
		this.authService.createNewUser(email, passwd, roles);
	}

}
