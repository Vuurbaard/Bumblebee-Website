import { Router } from '@angular/router';
import { Component, OnInit, Renderer, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/api/authentication.service';
import { SidebarService } from '../../services/website/sidebar.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	tts: string;

	constructor(public authService: AuthenticationService, private router: Router, private sidebarService: SidebarService) { }

	ngOnInit() {
	}

	tryTTS() {
		this.router.navigate(['/tts', this.tts]);
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/']);
	}

	toggleMenu() {
		this.sidebarService.toggle();
	}

}
