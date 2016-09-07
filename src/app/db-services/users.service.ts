import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../rxjs_operators';

import { DbUserDetails } from '../db-models/login';
import { UserService } from './user.service';
import { PgService } from '../pg.service';

@Injectable()
export class UsersService {

  public usersState: Observable<DbUserDetails[]>;

  constructor(private user: UserService, private pg: PgService) {
    this.usersState = this.loadUsers();
  }

  private loadUsers(): Observable<DbUserDetails[]> {
    return this.pg.pgcall(
      'login/user_list', {
        prm_token: this.user.userData.token
      });
  }
}
