import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { IApp } from '../../models/app';

@Injectable({
	providedIn: 'root'
})
export class AppService extends ApiService {

	constructor(authenticationService: AuthenticationService, http: HttpClient) {
		super(authenticationService, http);
	}

	getById(id: string) {
		return this.get<IApp>('/v1/app/' + id);
	}

	create(name: string) {
		return this.post<IApp>('/v1/app', { name: name });
	}

	edit(id: string, name: string) {
		return this.patch<IApp>('/v1/app/'+ id, { name: name });
	}

	remove(id: string) {
		return this.delete<IApp>('/v1/app/' + id);
	}
}
