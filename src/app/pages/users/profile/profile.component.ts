import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IUser } from '../../../models/user';
import { AuthenticationService } from '../../../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	constructor(private authenticationService: AuthenticationService, private apiService: ApiService, private flashMessagesService: FlashMessagesService) { }

	user: IUser;
	loading: Boolean = false;

	changePasswordModel: any = {
		currentPassword: "",
		newPassword: "",
		confirmPassword: ""
	}

	ngOnInit() {
		this.loading = true;
		this.apiService.get<IUser>('/users/' + this.authenticationService.user.id).toPromise().then(user => {
			//this.apiService.get<IUser>('/users/' + '5adb1b79c8e89101e2c7b577').toPromise().then(user => { 
			this.loading = false;
			this.user = user;
			console.log(user);
		})
			.catch(err => {
				this.loading = false;
				console.log(err);
			});
	}

	save() {

		this.apiService.post('/users/' + this.user._id, {
			name: this.user.name,
			email: this.user.email,
			avatar: this.user.avatar,
		}).toPromise().then(updatedUser => {
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

		this.apiService.post('/users/' + this.user._id + '/changepassword', {
			currentPassword: this.changePasswordModel.currentPassword,
			newPassword: this.changePasswordModel.newPassword,
			confirmPassword: this.changePasswordModel.confirmPassword,
		}).toPromise().then((res) => {

			if (res.error) {
				this.flashMessagesService.show(res.error, {
					cssClass: 'alert-danger',
					timeout: 5000
				});
			}
			else {
				this.flashMessagesService.show('Password successfully changed!', {
					cssClass: 'alert-success',
					timeout: 5000
				});

				this.changePasswordModel.currentPassword = "";
				this.changePasswordModel.newPassword = "";
				this.changePasswordModel.confirmPassword = "";
			}

		}).catch(err => {
			this.flashMessagesService.show(err, {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			console.log(err);
		});
	}
}
