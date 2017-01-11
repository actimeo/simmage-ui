import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../user.service';
import { DeviceService } from '../../device.service';

@Component({
  // no need: selector: 'app-main-center',
  templateUrl: './main-center.component.html',
  styleUrls: ['./main-center.component.css']
})
export class MainCenterComponent implements OnInit, OnDestroy {

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  private isMobile: boolean = false;
  private sub: Subscription;
  //localStorage can take only string variable
  private theme = localStorage['Theme'] ? JSON.parse(localStorage['Theme']) : false;

  constructor(private user: UserService, private router: Router,
    private device: DeviceService) { }

  ngOnInit() {

    this.sub = this.device.deviceType$.subscribe(t => {
      this.isMobile = t === 'mobile';
      if (this.isMobile) {
        this.sidenav.mode = 'over';
        if (this.router.url !== '/main') {
          this.sidenav.close();
        }
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  onLogout() {
    this.user.logout();
  }

  isAdmin() {
    return this.user.isAdmin();
  }

  onAdmin() {
    this.router.navigate(['/admin']);
  }

  onAccount() {
    this.router.navigate(['/account']);
  }

  onSidenavClicked() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  //Change the theme
  onThemeClicked() {
    this.theme =!this.theme;
    localStorage['Theme'] = JSON.stringify(this.theme); // only strings
  }
}
