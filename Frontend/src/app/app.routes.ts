import { Routes } from '@angular/router';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {HomeComponent} from './features/home/home.component';
import {LoginComponent} from './features/auth/pages/login/login.component';

export const routes: Routes = [

  {
   path:'',
   component: MainLayoutComponent,
   children:[
     {path:'', component: HomeComponent},
     {path:'login', component: LoginComponent}
   ]

  }
];
