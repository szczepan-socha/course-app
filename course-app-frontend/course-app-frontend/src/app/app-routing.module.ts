import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ParticipantsComponent } from './pages/participants/participants.component';
import { CreateEditComponent} from './pages/create-edit/create-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: 'participants/create', component: CreateEditComponent, canActivate: [LoginGuard] },     //CREATE
  { path: 'participants/edit:id', component: CreateEditComponent, canActivate: [LoginGuard] },    //EDIT
  { path: 'participants/:id', component: CreateEditComponent, canActivate: [LoginGuard] },        //READ
  { path: 'participants', component: ParticipantsComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
