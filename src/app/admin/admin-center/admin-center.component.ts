import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../db-services/user.service';

@Component({
// no need:  selector: 'app-admin-center',
  templateUrl: 'admin-center.component.html',
  styleUrls: ['admin-center.component.css']
})
export class AdminCenterComponent implements OnInit {

  constructor(private user: UserService, public router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.user.logout();
  }

  onMain() {
    this.router.navigate(['/']);
  }}
