import { Router } from '@angular/router';
import { Component, OnInit, Renderer } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	showMenu: boolean = true;
	tts: string;

	constructor(public authService: AuthenticationService, private router: Router, private renderer: Renderer) { }

	ngOnInit() {
	}

	tryTTS() {
		this.router.navigate(['/tts', this.tts]);
	}

	logout() {
		this.authService.logout();
	}

	toggleMenu() {
		this.showMenu = !this.showMenu;
		this.renderer.setElementClass(document.body, 'nav-toggle', this.showMenu);
	}

}
