import { MdSnackBar } from '@angular/material';
import { LOCALE_ID, Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import '../rxjs_operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  translation_list = [ 'de', 'en', 'fr' ];

  form: FormGroup;
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  invalidLogin: boolean = false;

  inDemo: boolean = false;
  showUsers: boolean = false;

  activeLang: string = '';

  userList: Array<string[]> = [];

  lockPassword: string = 'visibility';
  typePassword: string = 'password';
  condPassword: boolean = false;

  constructor(private fb: FormBuilder, public user: UserService, public router: Router,
    private activatedRoute: ActivatedRoute, public snackBar: MdSnackBar,
    @Inject(LOCALE_ID) protected locale_id) { }

  ngOnInit() {
    this.inDemo = window.localStorage.getItem('demoMode') === 'true' ? true : false;

    if (this.inDemo) {
      this.user.getUserListDemo()
        .subscribe(users => this.userList = users);
    }

    this.activeLang = window.localStorage.getItem('lang') || 'en';

    this.activatedRoute.params.pluck('lang');

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
      (info) => {
        if (info.date !== null) {
          this.snackBar.open('Last connection ' + info.date + ' from ' + info.ip, 'Ok');
        } else {
          this.snackBar.open('First connection with this login. Welcome!');
        }

        const pageToGo = window.localStorage.getItem('pageToGo');
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

  public setLogin(login) {
    this.loginCtrl.setValue(login);
  }

  public resetLoginField(event) {
    event.stopPropagation();
    this.loginCtrl.setValue('');
  }

  lightPassword() {
    this.condPassword = !this.condPassword;
    this.lockPassword = this.condPassword ? 'visibility_off' : 'visibility';
    this.typePassword = this.condPassword ? 'text' : 'password';
  }
}
