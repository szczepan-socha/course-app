import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule} from 'ngx-bootstrap/alert';
import { ParticipantsComponent } from './pages/participants/participants.component';

import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEditComponent } from './pages/create-edit/create-edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InnerHeaderComponent } from './shared/components/inner-header/inner-header.component';

import { LoginComponent } from './pages/login/login.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';
import { AuthState } from './shared/state/auth.state';


import { NavigationHandler } from './shared/handler/navigation.handler';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

const states = [AuthState];

const emptyFn = () => {
  return () => {}
};

@NgModule({
  declarations: [
    AppComponent,
    CreateEditComponent,
    DashboardComponent,
    ParticipantsComponent,
    LoginComponent,
    InnerHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxsModule.forRoot(states, { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: emptyFn,
      deps: [NavigationHandler],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
