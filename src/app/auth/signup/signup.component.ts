import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  	signUpForm: FormGroup;
	errorMessage: string;

	constructor(private formBuilder: FormBuilder,
							      private authService: AuthService,
							      private router: Router) { }

	ngOnInit() {
		this.initForm();
	}
	initForm() {
		this.signUpForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			passwd: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
		});
	}

	onSubmit() {
		console.log('-------- signup.onsubmit() called');
		const email = this.signUpForm.get('email').value;
		const passwd = this.signUpForm.get('passwd').value;
		console.log('-------- signup.onsubmit() called wtith ' + email + ' - ' + passwd);
		this.authService.createNewUser(email, passwd).then(
			() => {
                console.log('-------- signup.onsubmit() navigate to /recherches');
                this.router.navigate(['/recherches']); },
			(error) => {
				console.log('-------- signup.onsubmit() error' + error);
				this.errorMessage = error; }
		);
	}

}
