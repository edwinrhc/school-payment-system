import {Routes} from '@angular/router';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {HomeComponent} from './features/home/home.component';
import {LoginComponent} from './features/auth/pages/login/login.component';
import {RegisterComponent} from './features/auth/pages/register/register.component';
import {authGuard} from './core/guards/auth.guard';
import {roleGuard} from './core/guards/role.guard';
import {AdminDashboardComponent} from './features/dashboard/admin/admin-dashboard/admin-dashboard.component';
import {DashboardRedirectComponent} from './core/components/dashboard-redirect/dashboard-redirect.component';
import {SupportDashboardComponent} from './features/dashboard/support/support-dashboard/support-dashboard.component';

export const routes: Routes = [

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [

      {
        path: '',
        component: DashboardRedirectComponent,
      },

      {
        path: 'parent',
        canActivate: [roleGuard('PARENT')],
        component: HomeComponent
      },
      {
        path:'support',
        canActivate: [roleGuard('USER')],
        component: SupportDashboardComponent,
      },
      {
        path:'admin',
        canActivate: [roleGuard('ADMIN')],
        component: AdminDashboardComponent,
      },
    ],
  },

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: '**', redirectTo: ''}

];
