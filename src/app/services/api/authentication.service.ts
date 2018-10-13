import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {

	constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
	}

	logout() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('user');
	}

	authenticateUser(user) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');

		return this.http.post(environment.apiUrl + '/v1/login', user, { headers: headers });
	}

	registerUser(user) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');

		return this.http.post(environment.apiUrl + '/v1/register', user, { headers: headers });
	}

	storeUserData(token, user) {
		localStorage.setItem('access_token', token);
		localStorage.setItem('user', JSON.stringify(user));
	}

	isLoggedIn() {
		const token: string = localStorage.getItem('access_token');

		return token != null && !this.jwtHelper.isTokenExpired(token);
	}

	hasRole(role: string): boolean {

		if (this.user && this.user.roles) {
			if (this.user.roles.includes(role)) {
				return true;
			}
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
