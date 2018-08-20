import { Component, OnInit, Renderer, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../services/api/authentication.service';
import { SidebarService } from '../../services/website/sidebar.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	isVisible: boolean = false;
	isAdmin: boolean = false;

	constructor(public authenticationService: AuthenticationService, private renderer: Renderer, private sidebarService: SidebarService) { }

	ngOnInit() {
		this.isAdmin = this.authenticationService.user && this.authenticationService.hasRole('admin');

		this.sidebarService.visibility.subscribe(visibility => {
			console.log(visibility);

			this.renderer.setElementClass(document.body, 'nav-toggle', visibility);
			this.isVisible = visibility;
		});

		if(this.authenticationService.isLoggedIn()) {
			this.sidebarService.show();
		}

	}
}
