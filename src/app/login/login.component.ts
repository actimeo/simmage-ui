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
  
  lockPassword: string = 'lock';
  typePassword: string = 'password';
  condPassword: boolean = false;

  constructor(private fb: FormBuilder, public user: UserService, public router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(LOCALE_ID) protected locale_id) { }

  ngOnInit() {
    this.inDemo = window.localStorage.getItem('demoMode') === 'true' ? true : false;

    if (this.inDemo) {
      this.user.getUserListDemo()
        .subscribe(users => this.userList = users);
    }

    this.activeLang = window.localStorage.getItem('lang') || 'en';

    this.activatedRoute.params.pluck('lang');
/*    .filter(lang => !!lang)
      .subscribe(lang => this.setLangAndRestart(lang));
*/
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

  public setLogin(login) {
    this.loginCtrl.setValue(login);
  }

  public resetLoginField(event) {
    event.stopPropagation();
    this.loginCtrl.setValue('');
  }
  
  lightPassword(){
    this.condPassword =!this.condPassword;
    if (this.condPassword == true){
      this.lockPassword = 'lock_open';
      this.typePassword = 'text';
    }else{
      this.lockPassword = 'lock';
      this.typePassword = 'password';
    }
  }
}
