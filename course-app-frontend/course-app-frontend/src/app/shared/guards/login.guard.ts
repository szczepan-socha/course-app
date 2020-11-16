import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/auth.state';

@Injectable({
    providedIn: 'root'
})

export class LoginGuard implements CanActivate {

    constructor(private store: Store, private router: Router) {}
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

        const isAuthenticated = this.store.selectSnapshot(AuthState.isUserAuthenticated);

        if (isAuthenticated) {
            return true;
        } else {
            return this.router.parseUrl('login');
        }
    }
}