import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-app-create',
	templateUrl: './app-create.component.html',
	styleUrls: ['./app-create.component.scss']
})
export class AppCreateComponent implements OnInit {

	constructor() { }

	appForm: FormGroup;

	loading: Boolean = false;
	ngOnInit() {
		this.appForm = new FormGroup({
			name: new FormControl('', Validators.required),
		});
	}

}
