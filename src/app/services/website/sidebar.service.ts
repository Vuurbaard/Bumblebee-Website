import { Injectable } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs/Observable';
import { Observer } from '../../../../node_modules/rxjs/Observer';

@Injectable()
export class SidebarService {

	visible: boolean = false;
	visibility: Observable<boolean>;

	private observer: Observer<boolean>;

	constructor() {
		this.visibility = new Observable(observer => {
			this.observer = observer;
		});
	}

	show() {
		this.visible = true;
		this.observer.next(this.visible);
	}

	hide() {
		this.visible = false;
		this.observer.next(this.visible);
	}

	toggle() {
		this.visible = !this.visible;
		this.observer.next(this.visible);
	}
}
