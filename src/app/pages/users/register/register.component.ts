import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	username: String;
	email: String;
	password: String;

	constructor(private flashMessagesService: FlashMessagesService, private authenticationService: AuthenticationService, private router: Router) { }

	ngOnInit() {
	}

	onRegisterSubmit() {

		const user = {
			email: this.email,
			username: this.username,
			password: this.password
		}

		this.authenticationService.registerUser(user).toPromise().then(data => {

			this.flashMessagesService.show('You are now register and can login', { cssClass: 'alert-success' });
			this.router.navigate(['/login']);
			
		}).catch(err => {
			if(err.json().message) {
				this.flashMessagesService.show(err.json().message, { cssClass: 'alert-danger' });
			}
			else {
				this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger' });
			}
			this.router.navigate(['/register']);
		});
	}

}
