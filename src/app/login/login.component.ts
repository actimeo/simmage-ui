import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService} from '../db-services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private _fb: FormBuilder, private user: UserService,
    private router: Router) {
    this.form = this._fb.group({
      login: '',
      password: ''
    });

  }

  ngOnInit() { }

  onSubmit(value) {
    this.user.login(value.login, value.password).subscribe(
      (result) => { /* react */ },
      (error) => {
        // TODO: handle connection error 
        console.log(error);
      }
    );
  }
}
