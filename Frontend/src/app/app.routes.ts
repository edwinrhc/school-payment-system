import {Routes} from '@angular/router';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {HomeComponent} from './features/home/home.component';
import {LoginComponent} from './features/auth/pages/login/login.component';
import {RegisterComponent} from './features/auth/pages/register/register.component';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
    ],
  },

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  { path: '**', redirectTo: '' }



];
