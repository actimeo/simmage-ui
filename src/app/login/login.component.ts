import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService} from '../db-services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  invalidLogin: boolean = false;

  constructor(private fb: FormBuilder, private user: UserService, private router: Router) { }

  ngOnInit() {
    this.loginCtrl = new FormControl('', Validators.required);
    this.passwordCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      login: this.loginCtrl,
      password: this.passwordCtrl
    });

  }

  onSubmit() {
    this.user
      .login(this.loginCtrl.value, this.passwordCtrl.value)
      .subscribe(
      () => { /* react */ },
      (error) => {
        this.invalidLogin = true;
      });
  }
}
