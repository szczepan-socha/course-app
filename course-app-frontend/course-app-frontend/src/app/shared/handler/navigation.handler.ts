import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, ofActionCompleted } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Logout, Login } from '../state/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class NavigationHandler {
  constructor(
    private actions: Actions,
    private router: Router,
  ) {

    // register listener for actions:

    // Login
    this.actions.pipe(ofActionCompleted(Login)).subscribe(res => {
      if (res.result.successful) {
        this.router.navigate(['/dashboard']);
      }
    });

    // Logout
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
