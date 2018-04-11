import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authenticationService: AuthenticationService, private router: Router, private flashMessagesService: FlashMessagesService) {

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if(this.authenticationService.isLoggedIn()) {
			return true;
		}
		else {

			if(state.url != "/login") {
				this.router.navigate(['/login', state.url]);
			}

			this.flashMessagesService.show('You have to login first', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			
			return false;
		}
	}
}