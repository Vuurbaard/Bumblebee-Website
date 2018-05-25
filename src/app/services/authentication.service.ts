import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

	constructor(private http: Http, private jwtHelper: JwtHelperService) {
	}

	logout() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('user');
	}

	authenticateUser(user) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(environment.apiUrl + '/users/login', user, { headers: headers }).map(res => res.json());
	}

	registerUser(user) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(environment.apiUrl + '/users/register', user, { headers: headers }).map(res => res.json());
	}

	storeUserData(token, user) {
		localStorage.setItem('access_token', token);
		localStorage.setItem('user', JSON.stringify(user));
	}

	isLoggedIn() {
		const token: string = localStorage.getItem('access_token');

		return token != null && !this.jwtHelper.isTokenExpired(token);
	}

	hasRole(role: string) : boolean {

		if(this.user && this.user.roles.includes(role)) {
			return true;
		}
		
		return false;
	}

	get user() {
		return JSON.parse(localStorage.getItem('user'));
	}

	get token() {
		return localStorage.getItem('access_token');
	}
}
