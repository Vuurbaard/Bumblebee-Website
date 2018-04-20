import { environment } from './../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

	constructor(private authenticationService: AuthenticationService, private http: Http) {

	}

	private defaultHeaders(): Headers {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', this.authenticationService.token);
		return headers;
	}

	public get<T>(relativeUrl: string) {
		return this.http.get(environment.apiUrl + relativeUrl, { headers: this.defaultHeaders() }).map(res => res.json());
	}

	public post(relativeUrl: string, data: any) {
		return this.http.post(environment.apiUrl + relativeUrl, data, { headers: this.defaultHeaders() }).map(res => res.json());
	}
}
