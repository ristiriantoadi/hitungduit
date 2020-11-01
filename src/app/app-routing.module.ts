import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Route } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AngularFireAuthGuard,redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { NeracaBaruComponent } from './neraca-baru/neraca-baru.component';
import { NeracaComponent } from './neraca/neraca.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AngularFireAuthGuard],data:{ authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'neraca-baru',component:NeracaBaruComponent,canActivate:[AngularFireAuthGuard],data:{ authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'neraca/:id',component:NeracaComponent,canActivate:[AngularFireAuthGuard],data:{ authGuardPipe: redirectUnauthorizedToLogin }}
  ];
  

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
