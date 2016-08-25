import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-main-center',
  templateUrl: 'main-center.component.html',
  styleUrls: ['main-center.component.css']
})
export class MainCenterComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {
  }

  onLogout() {
    this.user.logout();
  }
}
