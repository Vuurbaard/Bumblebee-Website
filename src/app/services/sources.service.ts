import { ApiService } from './api.service';
import { environment } from './../../environments/environment';
import { Http, Headers } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ISource } from '../models/source';

@Injectable()
export class SourcesService extends ApiService {

	constructor(authenticationService: AuthenticationService, http: Http) {
		super(authenticationService, http);
	}

	all() {
		return this.get<ISource>('/v1/source');
	}

}
