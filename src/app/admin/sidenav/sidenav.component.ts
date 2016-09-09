import { Component, OnInit } from '@angular/core';

import { UserService, UserData } from '../../db-services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  userData: UserData = null;

  constructor(public user: UserService) {
    this.user.userDataState.subscribe(userData => this.userData = userData);
  }

  ngOnInit() {
  }

}
