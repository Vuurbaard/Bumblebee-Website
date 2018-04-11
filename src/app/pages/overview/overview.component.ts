import { SourcesService } from './../../services/sources.service';
import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

	constructor(private sourcesService: SourcesService) { }

	sources: [any];

	ngOnInit() {
		this.sourcesService.all().subscribe(data => {
			console.log(data);
			this.sources = data;
		});
	}

}
