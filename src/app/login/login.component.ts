import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private _fb: FormBuilder, private user: UserService) {
    this.form = this._fb.group({
      login: '',
      password: ''
    });

  }

  ngOnInit() {
  }

  onSubmit(value) {
    this.user.login(value.login, value.password).subscribe(
      (result) => {
        if (result) {
          // TODO: handle good auth
        }
      },
      (error) => {
        // TODO: handle connection error 
        console.log(error);
      }
    );
  }
}
