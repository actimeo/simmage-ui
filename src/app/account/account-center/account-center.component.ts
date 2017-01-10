import { DeviceService } from './../../device.service';
import { Router } from '@angular/router';
import { UserService } from './../../user.service';
import { Subscription } from 'rxjs/Subscription';
import { MdSidenav } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-account-center',
  templateUrl: './account-center.component.html',
  styleUrls: ['./account-center.component.css']
})
export class AccountCenterComponent implements OnInit, OnDestroy {


  @ViewChild(MdSidenav) sidenav: MdSidenav;

  private isMobile: boolean = false;
  private sub: Subscription;
  //localStorage can take only string variable
  private theme = JSON.parse(localStorage['Theme']);

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

  onDossiers() {
    this.router.navigate(['/main']);
  }

  onAdmin() {
    this.router.navigate(['/admin']);
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
