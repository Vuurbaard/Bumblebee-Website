import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ISource } from '../../models/source';

@Injectable()
export class SourcesService extends ApiService {

	constructor(authenticationService: AuthenticationService, http: HttpClient) {
		super(authenticationService, http);
	}

	all() {
		return this.get<[ISource]>('/v1/source');
	}

}
