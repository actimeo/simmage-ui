import { Component, OnInit } from '@angular/core';

import { UserService } from '../../db-services/user.service';
import { UserData } from '../../data/user-data';

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
