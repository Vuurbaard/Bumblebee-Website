import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { IApp } from '../../../models/app';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-app-overview',
	templateUrl: './app-overview.component.html',
	styleUrls: ['./app-overview.component.scss']
})
export class AppOverviewComponent implements OnInit {

	constructor(private apiService: ApiService, private activeRoute: ActivatedRoute) { }

	loading: Boolean = false;
	apps: Array<IApp>;

	ngOnInit() {

		if (this.activeRoute.snapshot.params.userId) {

			this.apiService.get<Array<IApp>>('/v1/app?user=' + this.activeRoute.snapshot.params.userId).then(apps => {
				this.apps = apps;
			}).catch(err => {

			});
		}
		else {
			this.apiService.get<Array<IApp>>('/v1/app/').then(apps => {
				this.apps = apps;
			}).catch(err => {

			});
		}


	}

}
