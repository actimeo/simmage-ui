import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-admin-center',
  templateUrl: 'admin-center.component.html',
  styleUrls: ['admin-center.component.css']
})
export class AdminCenterComponent implements OnInit {

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.user.logout();
  }

  onMain() {
    this.router.navigateByUrl('/');
  }}
