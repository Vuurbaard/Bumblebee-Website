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
	sources: [any];

	ngOnInit() {
		this.loading = true;

		this.sourcesService.all().then(data => {
			console.log(data);
			this.sources = data;
			this.loading = false;
		}).catch(err => {
			this.flashMessagesService.show("Something went wrong", { cssClass: 'alert-danger', timeout: 5000 });
		});
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
