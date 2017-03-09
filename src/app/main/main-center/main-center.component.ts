import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../services/utils/user.service';
import { DeviceService } from '../../services/utils/device.service';
import { SwitchthemeService } from '../../services/utils/switchtheme.service';

@Component({
  // no need: selector: 'app-main-center',
  templateUrl: './main-center.component.html',
  styleUrls: ['./main-center.component.css']
})
export class MainCenterComponent implements OnInit, OnDestroy {

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  private isMobile = false;
  private sub: Subscription;
  private theme: boolean;
  subscription: Subscription;

  constructor(private switchthemeService: SwitchthemeService, private user: UserService, private router: Router,
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
    this.subscription = this.switchthemeService.navItem$.subscribe(item => this.theme = item);
  }

  onLogout() {
    this.user.logout();
  }

  isAdmin() {
    return this.user.isAdmin();
  }

  isUser() {
    return this.user.isUser();
  }

  onAdmin() {
    this.router.navigate(['/admin']);
  }

  onAccount() {
    this.router.navigate(['/account']);
  }

  onDossiers() {
    this.router.navigate(['/main']);
  }

  onTeams() {
    this.router.navigate(['/teams']);
  }

  onReservations() {
    this.router.navigate(['/reservations']);
  }

  onPartners() {
    this.router.navigate(['/partners']);
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
