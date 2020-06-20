import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

	constructor(private authenticationService: AuthenticationService, private http: HttpClient) {

	}

	private defaultHeaders(): HttpHeaders {
		const headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', this.authenticationService.token);
		return headers;
	}

	public get<T>(relativeUrl: string) {
		return this.http.get<T>(environment.apiUrl + relativeUrl, { headers: this.defaultHeaders() }).toPromise();
	}

	public post<T>(relativeUrl: string, data: any) {
		return this.http.post<T>(environment.apiUrl + relativeUrl, data, { headers: this.defaultHeaders() }).toPromise();
	}

	public patch<T>(relativeUrl: string, data: any) {
		return this.http.patch<T>(environment.apiUrl + relativeUrl, data, { headers: this.defaultHeaders() }).toPromise();
	}

	public delete<T>(relativeUrl: string) {
		return this.http.delete<T>(environment.apiUrl + relativeUrl, { headers: this.defaultHeaders() }).toPromise();
	}
}
