import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { DbUserDetails } from '../../db-models/login';
import { UserService } from '../../shared/user.service';
import { PgService } from '../../pg.service';

@Injectable()
export class UsersService {

  constructor(private user: UserService, private pg: PgService) {
  }

  public loadUsers(): Observable<DbUserDetails[]> {
    return this.pg.pgcall(
      'login/user_list', {
        prm_token: this.user.userData.token
      });
  }
}
