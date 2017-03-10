import { ReduxService } from './../../../services/utils/redux.service';
import { DeviceService } from './../../../services/utils/device.service';
import { UserService } from './../../../services/utils/user.service';
import { SwitchthemeService } from './../../../services/utils/switchtheme.service';
import { MdSidenav } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit, OnDestroy {

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  private isMobile = false;
  private subs: Subscription[] = [];
  private theme: boolean;

  constructor(private switchthemeService: SwitchthemeService, private user: UserService,
    private router: Router,
    private device: DeviceService, private redux: ReduxService) { }

  ngOnInit() {
    this.subs.push(this.device.deviceType$.subscribe(t => {
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
    }));
    this.subs.push(this.switchthemeService.navItem$.subscribe(item => this.theme = item));

    this.subs.push(this.redux.sidenavClicked$.subscribe(() => this.onSidenavClicked()));
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

  onSidenavClicked() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
