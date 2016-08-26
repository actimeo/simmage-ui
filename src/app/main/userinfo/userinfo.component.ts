import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UserService, UserData } from '../../user.service';
import { DbPortal } from '../../db-models/portal';

@Component({
  selector: 'app-userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

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

  public selectPortal(porId) {
    this.user.selectPortal(porId);
  }

  public selectGroup(grpId) {
    this.user.selectGroup(grpId);
  }
}
