import { Component, Renderer } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	constructor(private renderer: Renderer) {

	}

	ngOnInit() {
		if(window.innerWidth > 767) {
			this.renderer.setElementClass(document.body, 'nav-toggle', true);
		}
		else {
			this.renderer.setElementClass(document.body, 'nav-toggle', false);
		}
		
	}

	swipe(event: any) {
		if(event == "swipeleft" && window.innerWidth < 767) {
			this.renderer.setElementClass(document.body, 'nav-toggle', false);
		}
		else if(event == "swiperight" && window.innerWidth < 767) {
			this.renderer.setElementClass(document.body, 'nav-toggle', true);
		}
	}
}
