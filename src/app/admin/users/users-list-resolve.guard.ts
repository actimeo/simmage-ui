import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UsersService } from './users.service';
import { EnumsService } from '../../services/backend/enums.service'
import { DbUserDetails, DbUsergroup } from '../../services/backend/db-models/login';

export interface UsersListData {
  users: DbUserDetails[];
  usergroups: DbUsergroup[];
  userRights: string[];
}

@Injectable()
export class UsersListResolve implements Resolve<DbUserDetails[]> {

  constructor(public usersService: UsersService, public router: Router, public enumsService: EnumsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let login = route.params['selusergroup'];   // TODO : remove saved selusergroup ID (when click on edit, filter the display list -> not wanted)
    if (login) {
      return this.getData(login);
    } else {
      return this.getData(0);
    }
  }

  public getData(login) {
    return Observable.zip(
      this.usersService.loadUsers(+login !== 0 ? login : null),
      this.usersService.loadUsergroups(),
      this.enumsService.enum_list('login/user_right'),
      (users: DbUserDetails, usergroups: DbUsergroup[], userrights: string[]) => {
        return {
          users: users,
          usergroups: usergroups,
          userRights: userrights
        };
      }
    ); 
  }

}
