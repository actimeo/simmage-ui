import { Component, OnInit } from '@angular/core';

import { UserService } from '../../db-services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public user: UserService) {
  }

  ngOnInit() {
  }

}
