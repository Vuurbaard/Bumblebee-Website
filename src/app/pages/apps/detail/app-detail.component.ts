import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../services/api/app.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-app-detail',
	templateUrl: './app-detail.component.html',
	styleUrls: ['./app-detail.component.scss']
})
export class AppDetailComponent implements OnInit {

	constructor(private appService: AppService, private flashMessagesService: FlashMessagesService, private activeRoute: ActivatedRoute, private router: Router, private route: ActivatedRoute) { }

	appForm: FormGroup;
	loading: Boolean = false;
	submitted: Boolean = false;
	editing: Boolean = false;

	// convenience getter for easy access to form fields
	get f() { return this.appForm.controls; }

	ngOnInit() {

		this.appForm = new FormGroup({
			name: new FormControl('', Validators.required),
			token: new FormControl(''),
		});

		if (this.activeRoute.snapshot.params.appId) {
			this.appService.getById(this.activeRoute.snapshot.params.appId).then(app => {
				this.appForm.get('name').setValue(app.name);
				this.appForm.get('token').setValue(app.token);
			}).catch(err => {
				this.flashMessagesService.show(err.error.message, {
					cssClass: 'alert-danger',
					timeout: 5000
				});
			});
		} else {
			this.router.navigate(['..'], { relativeTo: this.route });
		}
	}

	edit() {
		this.editing = true;
	}

	cancel() {
		this.editing = false;
	}

	save() {
		this.submitted = true;

		if (!this.appForm.valid) {
			return;
		}

		this.appService.edit(this.activeRoute.snapshot.params.appId, this.appForm.get('name').value).then((app) => {
			this.appForm.get('name').setValue(app.name);
			this.appForm.get('token').setValue(app.token);

			this.editing = false;
			this.submitted = false;

			this.flashMessagesService.show('Your app is updated successfully!', {
				cssClass: 'alert-success',
				timeout: 5000
			});
		}).catch(err => {
			this.submitted = false;
			this.flashMessagesService.show(err.error.message, {
				cssClass: 'alert-danger',
				timeout: 5000
			});
		});
	}

	delete() {
		this.appService.remove(this.activeRoute.snapshot.params.appId).then(() => {
			this.router.navigate(['..'], { relativeTo: this.route });
		});
	}
}
