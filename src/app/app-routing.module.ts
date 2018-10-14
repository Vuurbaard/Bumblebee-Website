import { TtsComponent } from './pages/tts/tts.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { OverviewComponent } from './pages/overview/overview.component';
import { FragmentifierComponent } from './pages/fragmentifier/fragmentifier.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { UserDetailComponent } from './pages/users/detail/user-detail.component';
import { UserOverviewComponent } from './pages/users/overview/user-overview.component';
import { AppOverviewComponent } from './pages/apps/overview/app-overview.component';
import { AppDetailComponent } from './pages/apps/detail/app-detail.component';
import { AppCreateComponent } from './pages/apps/create/app-create.component';

const routes: Routes = [
	// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: '', component: HomeComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'login/:redirect', component: LoginComponent },
	{ path: 'tts', component: TtsComponent },
	{ path: 'tts/:text', component: TtsComponent },
	{ path: 'overview', component: OverviewComponent },

	{ path: 'fragmentifier', component: FragmentifierComponent, canActivate: [AuthGuard] },

	{
		path: 'user', canActivate: [AuthGuard],
		children: [
			{
				path: '', component: UserOverviewComponent
			},
			{
				path: ':userId',
				children: [
					{ path: '', component: UserDetailComponent },
					{
						path: 'app',
						children: [
							{ path: '', component: AppOverviewComponent },
							{ path: 'create', component: AppCreateComponent },
							{ path: ':appId', component: AppDetailComponent },
						]
					},

				]
			}
		]
	},

	// { path: 'app', component: AppOverviewComponent, canActivate: [AuthGuard] },
	// { path: 'app/:appId', component: AppDetailComponent, canActivate: [AuthGuard] },
	// { path: 'app/create', component: AppCreateComponent, canActivate: [AuthGuard] },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
