import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../services/api/app.service';
import { IApp } from '../../../models/app';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-app-create',
	templateUrl: './app-create.component.html',
	styleUrls: ['./app-create.component.scss']
})
export class AppCreateComponent implements OnInit {

	constructor(private appService: AppService, private flashMessagesService: FlashMessagesService, private router: Router, private route: ActivatedRoute) { }

	appForm: FormGroup;
	loading: Boolean = false;

	ngOnInit() {
		this.appForm = new FormGroup({
			name: new FormControl('', Validators.required),
		});
	}

	create() {

		if(!this.appForm.get('name').value) {
			this.flashMessagesService.show('Name is required', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return;
		}

		this.appService.create(this.appForm.get('name').value).then((app: IApp) => {
			this.flashMessagesService.show('Your app is created successfully!', {
				cssClass: 'alert-success',
				timeout: 5000
			});
			this.router.navigate(['..'], { relativeTo: this.route });
		}).catch(err => {
			this.flashMessagesService.show(err.error.message, {
				cssClass: 'alert-danger',
				timeout: 5000
			});
		});
	}

}
