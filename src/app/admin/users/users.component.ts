import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../../db-services/users.service';
import { DbUserDetails } from '../../db-models/login';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent  {

  public usersData: Observable<DbUserDetails[]> = null;

  constructor(private usersService: UsersService) {
    this.usersData = this.usersService.usersState;
   }

}
