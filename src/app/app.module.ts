import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/login/login.component';
import { FragmentifierComponent } from './pages/fragmentifier/fragmentifier.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AudioService } from './services/audio.service';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ProfileComponent } from './pages/users/profile/profile.component';
import { TtsComponent } from './pages/tts/tts.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { SourcesComponent } from './pages/admin/sources/sources.component';
import { FragmentsComponent } from './pages/admin/fragments/fragments.component';
import { WordsComponent } from './pages/admin/words/words.component';
import { SourcesService } from './services/sources.service';
import { HomeComponent } from './pages/home/home.component';

export function jwtOptionsFactory() {
	return {
		tokenGetter: () => {
			return localStorage.get('access_token');
		}
	}
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
		ProfileComponent,
		TtsComponent,
		UsersComponent,
		SourcesComponent,
		FragmentsComponent,
		WordsComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpModule,
		HttpClientModule,
		FlashMessagesModule.forRoot(),
		JwtModule.forRoot({
			jwtOptionsProvider: {
				provide: JWT_OPTIONS,
				useFactory: jwtOptionsFactory
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
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
