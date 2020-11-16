import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Logout } from '../../shared/state/auth.actions';
import { AuthState } from '../../shared/state/auth.state';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Select(AuthState.getUsername) username$: Observable<string>;
  
  constructor(
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  goToParticipantsListPage(): void {
    this.router.navigate(['/participants']);
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
