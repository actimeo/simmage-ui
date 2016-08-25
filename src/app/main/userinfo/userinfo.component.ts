import { Component, OnInit } from '@angular/core';

import { UserService, UserData } from '../../user.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  public username: string = 'Philippe MARTIN';

  constructor(private user: UserService) {
    this.username = user.userData.getFullName();
  }

  ngOnInit() {
  }

}
