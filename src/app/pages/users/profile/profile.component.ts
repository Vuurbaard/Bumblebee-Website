import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { IUser } from '../../../models/user';
import { AuthenticationService } from '../../../services/api/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	constructor(private authenticationService: AuthenticationService, private apiService: ApiService, private flashMessagesService: FlashMessagesService) { }

	user: IUser;
	loading: Boolean = false;
	myForm: FormGroup;

	changePasswordModel: any = {
		currentPassword: "",
		newPassword: "",
		confirmPassword: ""
	}

	ngOnInit() {

		this.myForm = new FormGroup({
			name: new FormGroup({
				firstName: new FormControl('', Validators.required),
				lastName: new FormControl('', Validators.required),
			}),
			email: new FormControl('', [
				Validators.required,
				Validators.pattern("[^ @]*@[^ @]*")
			]),
			password: new FormControl('', [
				Validators.minLength(8),
				Validators.required
			]),
		});


		this.loading = true;
		this.apiService.get<IUser>('/v1/user/' + this.authenticationService.user._id).then(user => {
			this.loading = false;
			this.user = user;
			console.log(user);
		}).catch(err => {
			this.loading = false;
			console.log(err);
		});
	}

	save() {

		this.apiService.patch<IUser>('/v1/user/' + this.user._id, {
			name: this.user.name,
			email: this.user.email,
			avatar: this.user.avatar,
		}).then(updatedUser => {
			this.flashMessagesService.show('Profile successfully updated!', {
				cssClass: 'alert-success',
				timeout: 5000
			});

			this.user.name = updatedUser.name;
			this.user.email = updatedUser.email;
			this.user.avatar = updatedUser.avatar;

		}).catch(err => {
			this.flashMessagesService.show(err, {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			console.log(err);
		});
	}

	changePassword() {

		this.apiService.post<IUser>('/v1/user/' + this.user._id + '/changepassword', {
			currentPassword: this.changePasswordModel.currentPassword,
			newPassword: this.changePasswordModel.newPassword,
			confirmPassword: this.changePasswordModel.confirmPassword,
		}).then(user => {

			this.flashMessagesService.show('Password successfully changed!', {
				cssClass: 'alert-success',
				timeout: 5000
			});

			this.changePasswordModel.currentPassword = "";
			this.changePasswordModel.newPassword = "";
			this.changePasswordModel.confirmPassword = "";

		}).catch(err => {
			this.flashMessagesService.show(err, {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			console.log(err);
		});
	}
}
