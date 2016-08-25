import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService} from '../user.service';

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

  ngOnInit() {
    if (this.user.isLoggedIn()) {
      this.goNextPage();
    }
  }

  ngAfterViewInit() {
  }

  onSubmit(value) {
    this.user.login(value.login, value.password).subscribe(
      (result) => {
        if (result) {
          this.goNextPage();
        }
      },
      (error) => {
        // TODO: handle connection error 
        console.log(error);
      }
    );
  }

  private goNextPage() {
    this.router.navigateByUrl('/');
  }
}
