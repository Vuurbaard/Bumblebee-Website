import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { IApp } from '../../../models/app';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-app-overview',
	templateUrl: './app-overview.component.html',
	styleUrls: ['./app-overview.component.scss']
})
export class AppOverviewComponent implements OnInit {

	constructor(private apiService: ApiService, private activeRoute: ActivatedRoute, private flashMessagesService: FlashMessagesService) { }

	loading: Boolean = false;
	apps: Array<IApp>;

	ngOnInit() {

		this.loading = true;

		if (this.activeRoute.snapshot.params.userId) {

			this.apiService.get<Array<IApp>>('/v1/app?createdBy=' + this.activeRoute.snapshot.params.userId).then(apps => {
				this.apps = apps;
				this.loading = false;
			}).catch(err => {
				this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
			});
		} else {
			this.apiService.get<Array<IApp>>('/v1/app/').then(apps => {
				this.apps = apps;
				this.loading = false;
			}).catch(err => {
				this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
			});
		}


	}

}
