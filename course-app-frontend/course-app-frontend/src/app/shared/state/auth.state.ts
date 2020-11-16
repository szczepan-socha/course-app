import { Injectable } from '@angular/core';
import { State, StateContext, Action, Selector } from '@ngxs/store';
import { Login, Logout } from './auth.actions';

export interface AuthStateModel {
  token: string;
  username: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
  }
})
@Injectable()
export class AuthState {

  @Selector()
  static isUserAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static getUsername(state: AuthStateModel): string {
    return state.username;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, { payload }: Login): void {

    console.log('[AuthState] in login action');

    if (payload.username === 'admin' && payload.password === 'password') {

      ctx.setState({
        token: 'new token',
        username: 'admin',
      });

      console.log('User authenticated');

    } else {
      throw new Error('Not authorized - 401');
    }
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState({
      token: null,
      username: null,
    });
  }

}
