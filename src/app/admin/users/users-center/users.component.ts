import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UsersService } from '../users.service';
import { DbUsergroup } from '../../../db-models/login';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent implements OnInit {

  public usergroups: Observable<DbUsergroup[]> = null;

  private selectedId: number = 0;

  constructor(private usersService: UsersService, private router: Router) {
    this.usergroups = this.usersService.loadUsergroups();
  }

  ngOnInit() { }

  filterUsergroups(event) {
    this.selectedId = +event.target.value;
    this.router.navigate(['/admin/users', { 'selusergroup': this.selectedId }]);
  }

}
