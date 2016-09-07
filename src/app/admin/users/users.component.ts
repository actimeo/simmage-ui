import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../../db-services/users.service';
import { DbUserDetails } from '../../db-models/login';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent implements OnInit {

  private usersData: Observable<DbUserDetails[]> = null;

  constructor(private topics: UsersService) {
    this.usersData = this.topics.usersState;
   }

  ngOnInit() {
  }

}
