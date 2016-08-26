import { Component, OnInit } from '@angular/core';

import { UserService, UserData } from '../../user.service';

@Component({
  selector: 'app-main-sidenav',
  templateUrl: 'main-sidenav.component.html',
  styleUrls: ['main-sidenav.component.css']
})
export class MainSidenavComponent implements OnInit {

  private userData: UserData;

  constructor(private user: UserService) {
    // subscribe to get next pushes of userData
    this.user.userDataState.subscribe((userData) => {
      this.userData = userData;
    });
    this.userData = user.userData; // In case we lost first push
  }

  ngOnInit() {
  }
}
