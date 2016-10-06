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

  public sub: Subscription;
  public selectedLogin: string;

  constructor(private usersService: UsersService, private route: ActivatedRoute) {
    this.usersData = this.usersService.loadUsers(null);
  }

  ngOnInit() {
    this.sub = this.route.params
      .filter(params => !isNaN(params['selogin']))
      .subscribe(params => {
        this.selectedLogin = params['selogin'];
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  isSelected(user: DbUserDetails): boolean {
    return user.usr_login === this.selectedLogin;
  }

}
