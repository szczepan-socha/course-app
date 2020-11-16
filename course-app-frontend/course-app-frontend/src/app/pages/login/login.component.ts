import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Login } from '../../shared/state/auth.actions';
import { AuthState } from '../../shared/state/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showPassword = false;
  formSubmitted = false;

  @Select(AuthState.isUserAuthenticated) isUserAuthenticated$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.prepareForm();
    console.log('this.loginForm', this.loginForm);
  }

  showHide(): void {
    this.showPassword = !this.showPassword;
  }

  prepareForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    this.formSubmitted = true;
    // console.log(`username: ${this.loginForm.value.username} && password: ${this.loginForm.value.password}`);
    this.store.dispatch(new Login(this.loginForm.value));
  }

}
