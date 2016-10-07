import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UsersService } from '../users.service';
import { DbUserDetails } from '../../../db-models/login';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  public usersData: Observable<DbUserDetails[]> = null;

  public subLogin: Subscription;
  public subUsergroup: Subscription;
  public selectedLogin: string;
  public selectedUsergroup: number;

  constructor(private usersService: UsersService, private route: ActivatedRoute) {
    this.usersData = this.usersService.loadUsers(null);
  }

  ngOnInit() {
    this.subLogin = this.route.params
      .filter(params => !isNaN(params['selogin']))
      .subscribe(params => {
        this.selectedLogin = params['selogin'];
      });
    this.subUsergroup = this.route.params
      .filter(params => !isNaN(params['selusergroup']))
      .subscribe(params => {
        this.selectedUsergroup = params['selusergroup'];
        this.usersData = this.usersService.loadUsers(+this.selectedUsergroup !== 0 ? this.selectedUsergroup : null);
      });
  }

  ngOnDestroy() {
    if (this.subLogin) {
      this.subLogin.unsubscribe();
    }
    if (this.subUsergroup) {
      this.subUsergroup.unsubscribe();
    }
  }

  isSelected(user: DbUserDetails): boolean {
    return user.usr_login === this.selectedLogin;
  }

}
