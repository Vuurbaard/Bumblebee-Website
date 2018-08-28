import { SourcesService } from '../../services/api/sources.service';
import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/api/audio.service';
import { IFragment } from '../../models/fragment';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

	constructor(private sourcesService: SourcesService) { }

	loading: Boolean = false;
	sources: [any];

	ngOnInit() {
		this.loading = true;

		this.sourcesService.all().subscribe(data => {
			console.log(data);
			this.sources = data;
			this.loading = false;
		});
	}

	concatFragmentWords(fragments: Array<IFragment>): string {

		let concatted = "";

		for (let fragment of fragments) {
			if (fragment.word) {
				concatted += fragment.word.text + " ";
			}
		}

		return concatted;
	}
}
