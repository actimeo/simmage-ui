import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PgService } from '../../pg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  
  passwordForm: FormGroup;
  passwordCtrl: FormControl;
  confirmCtrl: FormControl;
  
  lockPassword: string = 'lock';
  typePassword: string = 'password';
  condPassword: boolean = false;
  
  condErrorIcon: boolean = false;
  errorIcon: string = 'error';
  
  
  static passwordMatch (group: FormGroup){
    const password = group.get('password').value;
    const confirm = group.get('confirm').value;
    return password === confirm ? null : { matchingError: true };
  }
  
  static customValidators(control: FormControl){
    
    let value = control.value;
    let counter: number = 0;
    if(/[A-Z]/.test(value)){
      counter ++;
    }else{
      console.log("no uppercase");
    }
    if(/[a-z]/.test(value)){
      counter ++;
    }else{
      console.log("no lowercase");
    }
    if(/[0-9]/.test(value)){
      counter ++;
    }else{
      console.log("no number");
    }
    if (/[!"#$%&’*+,-./:;<=>?@[\]^_`{|}~]/.test(value)) {
      counter ++;
    }else {
      console.log("no digit");
    }
   
    return counter > 2 ? null : { validatorError: true };
  }

  constructor(private fb: FormBuilder, private pgService : PgService, private router: Router) { }
   
  ngOnInit(){
    this.passwordCtrl = this.fb.control('', [Validators.required, 
                                              Validators.minLength(8), 
                                              ChangePasswordComponent.customValidators
                                              ]);
    this.confirmCtrl = this.fb.control('', Validators.required);
    
    this.passwordForm = this.fb.group(
      { password: this.passwordCtrl, confirm: this.confirmCtrl },
      { validator: ChangePasswordComponent.passwordMatch}
    );
  }
    changepassw(){
      console.log(this.passwordForm.value);
      this.pgService.pgcall('login/user_change_password', {prm_password: this.passwordCtrl.value} )
    .subscribe(
      () => this.router.navigate(['profile']),
      () => console.log("change pass failed")
    );
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
  lightIcon(){
      this.condErrorIcon =!this.condErrorIcon;
      if (this.condErrorIcon == true){
        this.errorIcon = 'error_outline'
      }else{
        this.errorIcon = 'error';
      }
  }
  
  

}