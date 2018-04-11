import { ApiService } from './api.service';
import { environment } from './../../environments/environment';
import { Http, Headers } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SourcesService extends ApiService {

	constructor(authenticationService: AuthenticationService, http: Http) {
		super(authenticationService, http);
	}

	all() {
		return this.get('/sources');
	}

}
