import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { UsersService } from '../users.service';
import { DbUserDetails, DbUsergroup } from '../../../db-models/login';
import { DbParticipant } from '../../../db-models/organ';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, CanComponentDeactivate {

  login: string;
  creatingNew: boolean = false;

  form: FormGroup;
  loginCtrl: FormControl;
  rightsCtrl: FormControl;
  participantCtrl: FormControl;
  usergroupCtrl: FormControl;

  private userRights: string[];

  private usergroupsData: any[];

  originalData: DbUserDetails = {
    usr_login: null, usr_rights: null,
    ugr_id: null, ugr_name: null,
    par_id: null, par_firstname: null, par_lastname: null
  };
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public usersService: UsersService) { }

  ngOnInit() {
    this.loginCtrl = new FormControl('', Validators.required);
    this.rightsCtrl = new FormControl(this.userRights);
    this.participantCtrl = new FormControl('');
    this.usergroupCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      login: this.loginCtrl,
      rights: this.rightsCtrl,
      participant: this.participantCtrl,
      usergroup: this.usergroupCtrl
    });

    this.route.data.forEach((data: { user: DbUserDetails }) => {
      if ('user' in data) {
        this.login = data.user.usr_login;
        this.creatingNew = false;
        this.loginCtrl.setValue(data.user.usr_login);
        this.loginCtrl.disable();
        this.userRights = data.user.usr_rights;
        this.rightsCtrl.setValue(this.userRights);
        this.participantCtrl.setValue(data.user.par_id);
        this.usergroupCtrl.setValue(data.user.ugr_id);
      } else {
        this.creatingNew = true;
        this.loginCtrl.setValue('');
        this.participantCtrl.setValue('');
        this.usergroupCtrl.setValue('');
      }
      this.setOriginalDataFromFields();
      this.errorMsg = '';
      this.errorDetails = '';
      this.pleaseSave = false;
    });

    this.usersService.loadUsergroups().subscribe(usergroups => this.usergroupsData = usergroups);
  }

  onSubmit() {
    /*this.setOriginalDataFromFields();
    if (this.creatingNew) {
      this.usersService.addUser(this.loginCtrl.value, this.rightsCtrl.value, this.participantCtrl.value, this.usergroupCtrl.value)
        .subscribe(() => {
          this.login = this.loginCtrl.value;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding user';
          this.errorDetails = err.text();
        });
    } else {
      this.usersService.updateUser(this.login, this.rightsCtrl.value, this.participantCtrl.value, this.usergroupCtrl.value)
        .subscribe(() => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error update user';
          this.errorDetails = err.text();
        });
    }*/
    console.log(this.loginCtrl.value);
    console.log(this.participantCtrl.value);
    console.log(this.rightsCtrl.value);
    console.log(this.usergroupCtrl.value);
  }

  doCancel() {
    this.setOriginalDataFromFields();
    this.goBackToList();
  }

  doDelete() {
    this.setOriginalDataFromFields();
    this.usersService.deleteUser(this.login).subscribe(ret => {
      this.goBackToList();
    },
    (err) => {
      this.errorMsg = 'Error deleting user';
      this.errorDetails = err.text();
    });
  }

  goBackToList(withSelected = false) {
    if (withSelected) {
      this.router.navigate(['/admin/users', { selogin: this.login }]);
    } else {
      this.router.navigate(['/admin/users']);
    }
  }

  canDeactivate() {
    if (this.originalDataChanged()) {
      this.pleaseSave = true;
      return false;
    } else {
      return true;
    }
  }

  private setOriginalDataFromFields() {
    this.originalData.usr_login = this.loginCtrl.value;
  }

  private originalDataChanged() {
    return this.originalData.usr_login !== this.loginCtrl.value;
  }

}
