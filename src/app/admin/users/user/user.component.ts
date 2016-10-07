import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { UsersService } from '../users.service';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';
import { DbUserDetails } from '../../../db-models/login';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, CanComponentDeactivate {

  private static USERRIGHTS_STRUCTURE = 'structure';
  private static USERRIGHTS_ORGANIZATION = 'organization';
  private static USERRIGHTS_USERS = 'users';

  login: string;
  creatingNew: boolean = false;

  form: FormGroup;
  loginCtrl: FormControl;
  participantCtrl: FormControl;
  usergroupCtrl: FormControl;
  rights: FormGroup;
  structureCtrl: FormControl;
  organizationCtrl: FormControl;
  usersCtrl: FormControl;

  private userRights: string[] = [];

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
    this.participantCtrl = new FormControl('');
    this.usergroupCtrl = new FormControl(null, Validators.required);

    this.structureCtrl = new FormControl(false);
    this.organizationCtrl = new FormControl(false);
    this.usersCtrl = new FormControl(false);

    this.rights = this.fb.group({
      structure: this.structureCtrl,
      organization: this.organizationCtrl,
      users: this.usersCtrl
    });

    this.form = this.fb.group({
      login: this.loginCtrl,
      rights: this.rights,
      participant: this.participantCtrl,
      usergroup: this.usergroupCtrl
    });

    this.route.data.forEach((data: { user: DbUserDetails }) => {
      if ('user' in data) {
        this.login = data.user.usr_login;
        this.creatingNew = false;
        this.loginCtrl.setValue(data.user.usr_login);
        this.loginCtrl.disable();
        this.participantCtrl.setValue(data.user.par_id);
        this.usergroupCtrl.setValue(data.user.ugr_id);
        this.userRights = data.user.usr_rights ? data.user.usr_rights : [];
        this.structureCtrl.setValue(this.userRights.filter(ur => ur === UserComponent.USERRIGHTS_STRUCTURE)[0] ? true : false);
        this.organizationCtrl.setValue(this.userRights.filter(ur => ur === UserComponent.USERRIGHTS_ORGANIZATION)[0] ? true : false);
        this.usersCtrl.setValue(this.userRights.filter(ur => ur === UserComponent.USERRIGHTS_USERS)[0] ? true : false);
      } else {
        this.creatingNew = true;
        this.loginCtrl.setValue('');
        this.participantCtrl.setValue('');
        this.usergroupCtrl.setValue(null);
        this.route.params
          .filter(params => !isNaN(params['selusergroup']))
          .subscribe(params => {
            this.usergroupCtrl.setValue(params['selusergroup']);
          });
        this.structureCtrl.setValue(false);
        this.organizationCtrl.setValue(false);
        this.usersCtrl.setValue(false);
      }
      this.setOriginalDataFromFields();
      this.errorMsg = '';
      this.errorDetails = '';
      this.pleaseSave = false;
    });

    this.usersService.loadUsergroups().subscribe(usergroups => this.usergroupsData = usergroups);
  }

  onSubmit() {
    this.setOriginalDataFromFields();
    if (this.userRights.length === 0) {
      this.userRights = null;
    }
    if (this.creatingNew) {
      this.usersService.addUser(
        this.loginCtrl.value,
        this.userRights,
        this.participantCtrl.value,
        +this.usergroupCtrl.value !== 0 ? this.usergroupCtrl.value : null)
        .subscribe(() => {
          this.login = this.loginCtrl.value;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding user';
          this.errorDetails = err.text();
        });
    } else {
      this.usersService.updateUser(
        this.login,
        this.userRights,
        this.participantCtrl.value,
        +this.usergroupCtrl.value !== 0 ? this.usergroupCtrl.value : null)
        .subscribe(() => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error update user';
          this.errorDetails = err.text();
        });
    }
  }

  updateUserRights(event) {
    let val = event.target.value;
    if (event.target.checked) {
      this.userRights.push(val);
    } else {
      this.userRights.splice(this.userRights.indexOf(val), 1);
    }
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
    this.originalData.ugr_id = +this.usergroupCtrl.value;
    this.originalData.par_id = +this.participantCtrl.value;
    this.originalData.usr_rights = this.rights.value;
  }

  private originalDataChanged() {
    return this.originalData.usr_login !== this.loginCtrl.value
      || this.originalData.ugr_id !== +this.usergroupCtrl.value
      || this.originalData.par_id !== +this.participantCtrl.value
      || this.objectsEquals(this.originalData.usr_rights, this.rights.value);
  }

  private objectsEquals(obj1: {}, obj2: {}): boolean {
    return obj1['structure'] !== obj2['structure']
      || obj1['organization'] !== obj2['organization']
      || obj1['users'] !== obj2['users'];
  }

}
