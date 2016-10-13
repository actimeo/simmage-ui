import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService} from '../user.service';

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

  activeLang: string = '';

  constructor(private fb: FormBuilder, public user: UserService, public router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeLang = window.localStorage.getItem('lang') || 'en';

    this.activatedRoute.params
      .filter(data => 'lang' in data)
      .map(data => data['lang'])
      .subscribe(lang => {
        this.setLangAndRestart(lang);
      });

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
      () => {
        let pageToGo = window.localStorage.getItem('pageToGo');
        if (pageToGo) {
          this.router.navigateByUrl(pageToGo);
          window.localStorage.removeItem('pageToGo');
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.invalidLogin = true;
      });
  }

  public setLangAndRestart(lang: string) {
    window.localStorage.setItem('lang', lang);
    window.location.href = '/login';
  }
}
