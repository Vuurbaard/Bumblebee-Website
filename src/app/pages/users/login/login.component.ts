import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	username: string;
	password: string;
	redirectTo: string;

	constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute, private flashMessagesService: FlashMessagesService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.redirectTo = params['redirect'];
			//console.log('should redirect to', this.redirectTo);
		});
	}

	onLoginSubmit() {
		const user = {
			username: this.username,
			password: this.password
		}

		this.authService.authenticateUser(user).toPromise().then(data => {

			this.authService.storeUserData(data.token, data.user);

			this.flashMessagesService.show('You are now logged in', {
				cssClass: 'alert-success',
				timeout: 5000
			});

			if (this.redirectTo) {
				this.router.navigate([this.redirectTo]);
			}
			else {
				this.router.navigate(['/']);
			}

		}).catch(err => {

			if (err.json().message) {
				this.flashMessagesService.show(err.message, { cssClass: 'alert-danger' });
			}
			else {
				this.flashMessagesService.show('Username or password is incorrect', { cssClass: 'alert-danger' });
			}

			this.router.navigate(['login']);
		});
	}
}
