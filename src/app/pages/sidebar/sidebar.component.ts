import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	isAdmin: boolean = false;

	constructor(public authenticationService: AuthenticationService) { }

	ngOnInit() {
		this.isAdmin =  this.authenticationService.user && this.authenticationService.user.isAdmin;
	}
	
}
