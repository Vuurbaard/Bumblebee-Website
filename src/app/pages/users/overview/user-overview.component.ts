import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { IUser } from '../../../models/user';

@Component({
	selector: 'app-user-overview',
	templateUrl: './user-overview.component.html',
	styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {

	constructor(private apiService: ApiService) { }

	users: [IUser];

	ngOnInit() {
		this.apiService.get<[IUser]>('/v1/user/').then(users => {
			this.users = users;
		}).catch(err => {

		});
	}

}
