import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { IUser } from '../../../models/user';
import { AuthenticationService } from '../../../services/api/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

	constructor(private activeRoute: ActivatedRoute, private apiService: ApiService, private flashMessagesService: FlashMessagesService) { }

	loading: Boolean = false;
	profileForm: FormGroup;

	changePasswordModel: any = {
		currentPassword: "",
		newPassword: "",
		confirmPassword: ""
	}

	ngOnInit() {

		this.profileForm = new FormGroup({
			_id: new FormControl('', Validators.required),
			username: new FormControl('', Validators.required),
			name: new FormControl(''),
			email: new FormControl('', [
				Validators.required,
				Validators.pattern("[^ @]*@[^ @]*")
			]),
			avatar: new FormControl(''),
			// password: new FormControl('', [
			// 	Validators.minLength(8),
			// 	Validators.required
			// ]),
		});

		this.loading = true;
		this.apiService.get<IUser>('/v1/user/' + this.activeRoute.snapshot.params.userId).then(user => {
			this.loading = false;
			this.profileForm.patchValue({
				"_id": user._id,
				"username": user.username,
				"name": user.name,
				"email": user.email
			});

		}).catch(err => {
			this.flashMessagesService.show("Something went wrong", { cssClass: 'alert-danger', timeout: 5000 });
		});
	}

	save() {

		this.loading = true;

		this.profileForm.get('_id').value
		this.apiService.patch<IUser>('/v1/user/' + this.profileForm.get('_id').value, {
			name: this.profileForm.get('name').value,
			email: this.profileForm.get('email').value,
			avatar: this.profileForm.get('avatar').value,
		}).then(user => {

			this.flashMessagesService.show('Profile successfully updated!', {
				cssClass: 'alert-success',
				timeout: 5000
			});

			this.profileForm.patchValue({
				"_id": user._id,
				"username": user.username,
				"name": user.name,
				"email": user.email,
				"avatar": user.avatar
			});

			this.loading = false;

		}).catch(err => {
			this.flashMessagesService.show(err, {
				cssClass: 'alert-danger',
				timeout: 5000
			});

			this.loading = false;
		});
	}

	// changePassword() {

	// 	this.apiService.post<IUser>('/v1/user/' + this.user._id + '/changepassword', {
	// 		currentPassword: this.changePasswordModel.currentPassword,
	// 		newPassword: this.changePasswordModel.newPassword,
	// 		confirmPassword: this.changePasswordModel.confirmPassword,
	// 	}).then(user => {

	// 		this.flashMessagesService.show('Password successfully changed!', {
	// 			cssClass: 'alert-success',
	// 			timeout: 5000
	// 		});

	// 		this.changePasswordModel.currentPassword = "";
	// 		this.changePasswordModel.newPassword = "";
	// 		this.changePasswordModel.confirmPassword = "";

	// 	}).catch(err => {
	// 		this.flashMessagesService.show(err, {
	// 			cssClass: 'alert-danger',
	// 			timeout: 5000
	// 		});
	// 		console.log(err);
	// 	});
	// }
}
