import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { RechercheListComponent } from './recherche-list/recherche-list.component';
import { RechercheComponent } from './recherche/recherche.component';


const routes: Routes = [
   { path: 'auth/signup', component: SignupComponent },
    { path: 'auth/signin', component: SigninComponent },
    { path: 'recherches', canActivate: [AuthGuardService], component: RechercheListComponent },
    { path: 'recherches/new', canActivate: [AuthGuardService], component: RechercheComponent },
    { path: 'recherches/edit/:id', canActivate: [AuthGuardService], component: RechercheComponent },
    { path: 'not-found', redirectTo: 'recherches', pathMatch: 'full'},
    {path: '', redirectTo: 'recherches', pathMatch: 'full'},
    { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
