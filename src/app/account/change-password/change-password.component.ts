import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PgService } from '../../services/backend/pg.service';
import { Router } from '@angular/router';
import { SnackService } from '../../services/utils/snack.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;
  passwordCtrl: FormControl;
  confirmCtrl: FormControl;

  lockPassword = 'lock';
  typePassword = 'password';
  condPassword = false;

  condErrorIcon = false;
  errorIcon = 'error';


  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirm = group.get('confirm').value;
    return password === confirm ? null : { matchingError: true };
  }

  static customValidators(control: FormControl) {

    const value = control.value;
    let counter = 0;
    if (/[A-Z]/.test(value)) {
      counter++;
    }
    if (/[a-z]/.test(value)) {
      counter++;
    }
    if (/[0-9]/.test(value)) {
      counter++;
    }
    if (/[!"#$%&’*+,-./:;<=>?@[\]^_`{|}~]/.test(value)) {
      counter++;
    }

    return counter > 2 ? null : { validatorError: true };
  }

  constructor(public snackService: SnackService, private fb: FormBuilder, private pgService: PgService, private router: Router) { }

  ngOnInit() {
    this.passwordCtrl = this.fb.control('', [Validators.required,
    Validators.minLength(8),
    ChangePasswordComponent.customValidators
    ]);
    this.confirmCtrl = this.fb.control('', Validators.required);

    this.passwordForm = this.fb.group(
      { password: this.passwordCtrl, confirm: this.confirmCtrl },
      { validator: ChangePasswordComponent.passwordMatch }
    );
  }

  changepassw() {
    this.pgService.pgcall('login/user_change_password', { prm_password: this.passwordCtrl.value })
      .subscribe(
      (info) => {
        let message: string;
        message = 'Changing the password correctly executed';
        this.snackService.message({ message: message, action: 'Ok' });
        this.router.navigate(['account', 'profile']);
      },
      (error) => {
        console.log('error in password change');
      });
  }

  lightPassword() {
    this.condPassword = !this.condPassword;
    if (this.condPassword) {
      this.lockPassword = 'lock_open';
      this.typePassword = 'text';
    } else {
      this.lockPassword = 'lock';
      this.typePassword = 'password';
    }
  }

  lightIcon() {
    this.condErrorIcon = !this.condErrorIcon;
    if (this.condErrorIcon) {
      this.errorIcon = 'error_outline';
    } else {
      this.errorIcon = 'error';
    }
  }
}
