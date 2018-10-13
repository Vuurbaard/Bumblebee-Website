import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';
import { WordService } from './word.service';

@Injectable()
export class FragmentService extends ApiService {

	constructor(authenticationService: AuthenticationService, http: HttpClient, private wordService: WordService) {
		super(authenticationService, http);
	}

	public async save(sourceId: string, fragments: Array<any>) {

		// First try to save all the words
		let texts = fragments.map(fragment => {	return fragment.word.text; });
		let words = await this.wordService.saveMultipleByTexts(texts);

		fragments = fragments.map(fragment => {

			fragment.word = words.filter(word => {
				return word.text == fragment.word.text;
			})[0];

			fragment.source = sourceId;

			return fragment;
		});

		let promises = fragments.map(fragment => {
			return this.post('/v1/fragment', fragment);
		});

		try {
			let newlyCreatedFragments = await Promise.all(promises);
			console.log(newlyCreatedFragments);
		}
		catch(err)  {
			console.log(err);
		}
	}

}
