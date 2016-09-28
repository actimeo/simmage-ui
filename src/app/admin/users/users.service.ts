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

  public loadUsers(prm_ugr_id: number): Observable<DbUserDetails[]> {
    return this.pg.pgcall(
      'login/user_list', {
        prm_token: this.user.userData.token,
        prm_ugr_id: prm_ugr_id
      });
  }
}
