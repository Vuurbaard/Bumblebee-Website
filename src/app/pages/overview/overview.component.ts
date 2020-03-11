import { SourcesService } from '../../services/api/sources.service';
import { Component, OnInit } from '@angular/core';
import { IFragment } from '../../models/fragment';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

	constructor(private sourcesService: SourcesService, private flashMessagesService: FlashMessagesService) { }

	loading: Boolean = false;
	_sources: [any];
	sources: [any];

	search: string = "";

	ngOnInit() {
		this.loading = true;

		this.sourcesService.all().then(data => {
			this._sources = data;
			this.sources = data;
			this.loading = false;
		}).catch(err => {
			this.flashMessagesService.show("Something went wrong", { cssClass: 'alert-danger', timeout: 5000 });
		});
	}

	applySearch(search : string)
	{
		const vm = this;
		
		let words = search.split(' ');

		if(search.length === 0){
			this.sources = Object.assign([], this._sources);
		} else {
			this.sources = this._sources.filter(function(item) {
				let counter = 0;
				
				item['fragments'].forEach(element => {
					words.forEach(search => {
						if(element['word'] != null && element['word']['text'].includes(search)){
							counter++;
						}						
					});
				});
				return counter == words.length;
			}) as [any];

		}
	}

	concatFragmentWords(fragments: Array<IFragment>): string {

		let concatted = "";

		fragments.sort(function (a, b) {
			return Number(a.start) - Number(b.start);
		});

		for (let fragment of fragments) {
			if (fragment.word) {
				concatted += fragment.word.text + " ";
			}
		}

		return concatted;
	}
}
