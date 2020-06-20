import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { IWord } from '../../models/word';


@Injectable()
export class WordService extends ApiService {

	constructor(authenticationService: AuthenticationService, http: HttpClient) {
		super(authenticationService, http);
	}

	getByText(text: string) {
		return this.get<IWord>('/v1/word?text=' + text);
	}

	createNew(text: string) {
		return this.post('/v1/word', { text: text });
	}

	async saveMultipleByTexts(texts: string[]) {

		// Map the input array to GET requests
		const promises = texts.map(text => {
			return this.getByText(text);
		});

		// Execute all GET requests
		const result = await Promise.all(promises);

		const existingWords = result.filter(word => {
			return word[0] != null;
		}).map(word => word[0]);

		const nonExistingWords = texts.filter(text => {
			return existingWords.filter(word => word.text == text).length == 0;
		}).map(text => {
			return this.createNew(text);
		});

		const newlyCreatedWords = await Promise.all(nonExistingWords);
		const words = existingWords.concat(newlyCreatedWords);

		return words;
	}
}
