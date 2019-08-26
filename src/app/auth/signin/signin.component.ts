import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
    errorMessage: string;

	constructor(private formBuilder: FormBuilder,
							      private authService: AuthService,
							      private router: Router) { }

	ngOnInit() {
		this.initForm();
	}
	initForm() {
		this.signInForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			passwd: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
		});
	}

	onSubmit() {
		console.log('-------- signIn.onsubmit() called');
		const email = this.signInForm.get('email').value;
		const passwd = this.signInForm.get('passwd').value;
		console.log('-------- signIn.onsubmit() called wtith ' + email + ' - ' + passwd);
		this.authService.signInUser(email, passwd).then(
			() => {
                console.log('-------- signIn.onsubmit() navigate to /recherches ');
                this.router.navigate(['/recherches']); },
			(error) => {
				console.log('-------- signIp.onsubmit() error' + error);
				this.errorMessage = error; }
		);
	}

}
