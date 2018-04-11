import { SourcesService } from './../../../services/sources.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sources',
	templateUrl: './sources.component.html',
	styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

	sources: [any];
	pagesize: number = 25;
	page: number = 0;

	constructor(private sourcesService : SourcesService) { }

	ngOnInit() {
		this.sourcesService.all().subscribe(data => {
			console.log(data);
			this.sources = data;
		});
	}

}
