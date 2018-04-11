import { WordsComponent } from './pages/admin/words/words.component';
import { FragmentsComponent } from './pages/admin/fragments/fragments.component';
import { SourcesComponent } from './pages/admin/sources/sources.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { TtsComponent } from './pages/tts/tts.component';
import { ProfileComponent } from './pages/users/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { OverviewComponent } from './pages/overview/overview.component';
import { FragmentifierComponent } from './pages/fragmentifier/fragmentifier.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
	// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: '', component: HomeComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'login/:redirect', component: LoginComponent },
	{ path: 'tts', component: TtsComponent },
	{ path: 'tts/:text', component: TtsComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
	{ path: 'fragmentifier', component: FragmentifierComponent, canActivate: [AuthGuard] },
	{ path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
	{ path: 'admin/users', component: UsersComponent, canActivate: [AdminGuard] },
	{ path: 'admin/sources', component: SourcesComponent, canActivate: [AdminGuard] },
	{ path: 'admin/fragments', component: FragmentsComponent, canActivate: [AdminGuard] },
	{ path: 'admin/words', component: WordsComponent, canActivate: [AdminGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
