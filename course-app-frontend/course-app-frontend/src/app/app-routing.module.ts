import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ParticipantsComponent } from './pages/participants/participants.component';
import { CreateEditComponent} from './pages/create-edit/create-edit.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
