import { Http } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class AudioService extends ApiService {

	constructor(authenticationService: AuthenticationService, http: Http) {
		super(authenticationService, http);
	}

	download(url: string) {
		return this.post('/audio/download', { 'url': url });
	}

	saveFragments(sourceId: string, fragments: Array<any>) {
		return this.post('/fragments', { sourceId: sourceId, fragments: fragments });
	}

	tts(text: string) {
		console.log("tts:", text);

		return this.post('/tts', { text: text });
	}
}