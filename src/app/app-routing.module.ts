import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },


  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'list', loadChildren: './list/list.module#ListPageModule', canActivate: [AuthGuard] },
  { path: 'retrait', loadChildren: './pages/retrait/retrait.module#RetraitPageModule', canActivate: [AuthGuard] },
  { path: 'resultat', loadChildren: './pages/resultat/resultat.module#ResultatPageModule' },
  { path: 'transfert', loadChildren: './pages/transfert/transfert.module#TransfertPageModule' },
  { path: 'misajr-caise', loadChildren: './pages/misajr-caise/misajr-caise.module#MisajrCaisePageModule' },
 

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }