import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class AudioService extends ApiService {

	constructor(authenticationService: AuthenticationService, http: HttpClient) {
		super(authenticationService, http);
	}

	randomColors: Array<string> = [
		'#f6a821', '#24262d', '#0f83c9', '#1bbf89', '#56c0e0', '#f7af3e', '#db524b'
	];

	download(url: string) {
		return this.post('/v1/audio/download', { 'url': url });
	}

	async tts(text: string) {
		console.log('tts:', text);

		const data = await this.post<any>('/v1/tts', { text: text });

		if (data.fragments) {
			for (const index in data.fragments) {
				const fragment = data.fragments[index];

				if (typeof (fragment) == 'string') {
					data.fragments[index] = { color: '#949ba2', word: { text: fragment }};
				} else {
					fragment.color = this.randomColors[Math.floor(Math.random() * this.randomColors.length)];
				}
			}
		}

		return data;
	}
}
