import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

import { AuthenticationService } from './services/api/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FragmentifierComponent } from './pages/fragmentifier/fragmentifier.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AudioService } from './services/api/audio.service';
import { OrderByPipe } from './pipes/order-by.pipe';
import { TtsComponent } from './pages/tts/tts.component';
import { SourcesService } from './services/api/sources.service';
import { HomeComponent } from './pages/home/home.component';
import { ApiService } from './services/api/api.service';
import { WordService } from './services/api/word.service';
import { FragmentService } from './services/api/fragment.service';
import { SidebarService } from './services/website/sidebar.service';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';

import { UserOverviewComponent } from './pages/users/overview/user-overview.component';
import { UserDetailComponent } from './pages/users/detail/user-detail.component';
import { AppOverviewComponent } from './pages/apps/overview/app-overview.component';
import { AppDetailComponent } from './pages/apps/detail/app-detail.component';
import { AppCreateComponent } from './pages/apps/create/app-create.component';
import { AppService } from './services/api/app.service';


export function tokenGetter() {
	return localStorage.getItem('access_token');
}

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		SidebarComponent,
		RegisterComponent,
		LoginComponent,
		FragmentifierComponent,
		OverviewComponent,
		DashboardComponent,
		OrderByPipe,
		UserDetailComponent,
		TtsComponent,
		HomeComponent,
		UserOverviewComponent,
		AppOverviewComponent,
		AppDetailComponent,
		AppCreateComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		FlashMessagesModule.forRoot(),
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				whitelistedDomains: ['localhost:3000', 'localhost:4200','api.bmbl.mijnproject.nu','bmbl.mijnproject.nu', 'api.bumblebee.fm', 'bumblebee.fm'],
				authScheme: ""
			}
		}),
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		AuthGuard,
		AdminGuard,
		AuthenticationService,
		AudioService,
		SourcesService,
		ApiService,
		WordService,
		FragmentService,
		AppService,
		SidebarService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
