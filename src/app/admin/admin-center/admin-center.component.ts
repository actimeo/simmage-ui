import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../user.service';
import { DeviceService } from '../../device.service';
import { SwitchthemeService } from '../../switchtheme.service';

@Component({
  // no need:  selector: 'app-admin-center',
  templateUrl: './admin-center.component.html',
  styleUrls: ['./admin-center.component.css'],
})
export class AdminCenterComponent implements OnInit, OnDestroy {

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  private isMobile: boolean = false;
  private sub: Subscription;
  //localStorage can take only string variable
  private theme : boolean;
  subscription:Subscription;

  constructor(private switchthemeService: SwitchthemeService,private user: UserService, public router: Router,
    private device: DeviceService) { }

  ngOnInit() {
    this.sub = this.device.deviceType$.subscribe(t => {
      this.isMobile = t === 'mobile';
      if (this.isMobile) {
        this.sidenav.mode = 'over';
        if (this.router.url !== '/admin') {
          this.sidenav.close();
        }
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.subscription = this.switchthemeService.navItem$.subscribe(item => this.theme = item)
  }

  onLogout() {
    this.user.logout();
  }

  onMain() {
    this.router.navigate(['/']);
  }
  
  onAdmin() {
    this.router.navigate(['/admin']);
  }
  
  onAccount() {
    this.router.navigate(['/account']);
  }

  isUser(): boolean {
    return this.user.isUser();
  }
  
  isAdmin() {
    return this.user.isAdmin();
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
    // prevent memory leak when component is destroyed
      this.subscription.unsubscribe();
  }
}