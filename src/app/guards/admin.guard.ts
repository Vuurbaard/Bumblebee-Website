import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private authenticationService: AuthenticationService, private router: Router, private flashMessagesService: FlashMessagesService) {

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if(this.authenticationService.isLoggedIn() && this.authenticationService.user.isAdmin) {
			return true;
		}
		else {

			if(state.url != "/login") {
				this.router.navigate(['/login', state.url]);
			}

			this.flashMessagesService.show('You are not an admin', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			
			return false;
		}
	}
}