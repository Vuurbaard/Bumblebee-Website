import { Http } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class AudioService extends ApiService {

	constructor(authenticationService: AuthenticationService, http: Http) {
		super(authenticationService, http);
	}

	randomColors: Array<string> = [
		"#f6a821", "#24262d", "#0f83c9", "#1bbf89", "#56c0e0", "#f7af3e", "#db524b"
	];

	download(url: string) {
		return this.post('/v1/audio/download', { 'url': url }).toPromise();
	}

	async tts(text: string) {
		console.log("tts:", text);

		let data = await this.post('/v1/tts', { text: text }).toPromise();

		if (data.fragments) {
			for (let index in data.fragments) {
				let fragment = data.fragments[index];

				if (typeof (fragment) == "string") {
					data.fragments[index] = { color: "#949ba2", word: { text: fragment }}
				}
				else {
					fragment.color = this.randomColors[Math.floor(Math.random() * this.randomColors.length)]
				}
			}
		}

		return data;
	}
}
