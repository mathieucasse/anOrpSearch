import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;
  loading = false;
  error = '';

	constructor(private formBuilder: FormBuilder,
							      private userService: UserService,
							      private authService : AuthService,
							      private router: Router) {
  }

	ngOnInit() {
		this.initForm();
    this.userService.logout();
	}

	initForm() {
		this.signInForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			passwd: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{5,}/)]]
		});
	}

  onSubmit() {
    this.loading = true;

    const email = this.signInForm.get('email').value;
    const passwd = this.signInForm.get('passwd').value;
    this.authService.login(email, passwd)
      .subscribe(
        result  => {
          this.loading = false;
          if (result) {
            this.userService.login(result);
            this.router.navigate(['/recherches']);
          } else {
            this.error = 'Username or password is incorrect';
          }
        },
        error => {
          this.error = 'Username or password is incorrect == ' + error ;
          this.loading = false;
        }
      );
  }

	onSubmitFirebase() {
		console.log('-------- signIn.onsubmit() called');
		const email = this.signInForm.get('email').value;
		const passwd = this.signInForm.get('passwd').value;
		console.log('-------- signIn.onsubmit() called wtith ' + email + ' - ' + passwd);
		this.userService.signInUserFirebase(email, passwd).then(
			() => {
        console.log('-------- signIn.onsubmit() navigate to /recherches ');
        this.router.navigate(['/recherches']); },
			(error) => {
				console.log('-------- signIp.onsubmit() error' + error);
				this.errorMessage = error; }
		);
	}

}
