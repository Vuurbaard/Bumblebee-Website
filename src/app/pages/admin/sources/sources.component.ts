import { SourcesService } from '../../../services/api/sources.service';
import { Component, OnInit } from '@angular/core';
import { ISource } from '../../../models/source';

@Component({
	selector: 'app-sources',
	templateUrl: './sources.component.html',
	styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

	sources: [ISource];
	pagesize: number = 25;
	page: number = 0;

	constructor(private sourcesService : SourcesService) { }

	ngOnInit() {
		this.sourcesService.all().then(sources => {
			console.log(sources);
			this.sources = sources;
		});
	}

}
