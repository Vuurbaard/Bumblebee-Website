import { environment } from './../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

	constructor(private authenticationService: AuthenticationService, private http: Http) {

	}

	private defaultHeaders() : Headers {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', this.authenticationService.token);
		return headers;
	}

	get(url) {
		
		return this.http.get(environment.apiUrl + url, { headers: this.defaultHeaders() }).map(res => res.json());
	}

	post(url, data) {
		return this.http.post(environment.apiUrl + url, data, { headers: this.defaultHeaders() }).map(res => res.json());
	}
}
