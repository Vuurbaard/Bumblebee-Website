import { Component } from '@angular/core';
import { SidebarService } from './services/website/sidebar.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private sidebarService: SidebarService) {

	}

	ngOnInit() {

	}

	swipe(event: any) {
		if(event == "swipeleft" && window.innerWidth < 767) {
			this.sidebarService.hide();
		}
		else if(event == "swiperight" && window.innerWidth < 767) {
			this.sidebarService.show();
		}
	}
}
