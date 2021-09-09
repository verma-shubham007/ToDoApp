import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesError404Component } from './components/pages-error404/pages-error404.component';

export const routes: Routes = [
  {
      path: 'auth',
      component: AuthenticationComponent
  },
  {
      path: '',
      canActivate: [AuthGuard],
      component: DashboardComponent
  },
  {
      path: 'page-not-found',
      component: PagesError404Component
  },
  {
      path: '**',
      redirectTo: 'page-not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
