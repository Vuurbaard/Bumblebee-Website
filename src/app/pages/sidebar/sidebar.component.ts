import { Component, OnInit, Renderer, EventEmitter, Output, HostListener } from '@angular/core';
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
	windowWidth: number = window.innerWidth;
	windowHeight: number = window.innerHeight;

	constructor(public authenticationService: AuthenticationService, private renderer: Renderer, private sidebarService: SidebarService) { }

	ngOnInit() {
		this.isAdmin = this.authenticationService.user && this.authenticationService.hasRole('admin');

		this.sidebarService.visibility.subscribe(visibility => {
			this.renderer.setElementClass(document.body, 'nav-toggle', visibility);
			this.isVisible = visibility;
		});

		if (window.innerWidth > 767 && this.authenticationService.isLoggedIn()) {
			this.sidebarService.show();
		}
		else {
			this.sidebarService.hide();
		}

	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		
		if(event.target.innerWidth <= this.windowWidth && window.innerWidth < 767) {
			if(this.sidebarService.visibility) {
				this.sidebarService.hide();
			}
		}
		if(event.target.innerWidth >= this.windowWidth && window.innerWidth > 767) {
			if(!this.sidebarService.visibility) {
				this.sidebarService.show();
			}
		}

		this.windowWidth = event.target.innerWidth;
		this.windowHeight = event.target.innerHeight;
	}

	close() {
		this.sidebarService.hide();
	}
}
