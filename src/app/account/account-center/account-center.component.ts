import { DeviceService } from './../../services/utils/device.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/utils/user.service';
import { Subscription } from 'rxjs/Subscription';
import { MdSidenav } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SwitchthemeService } from '../../services/utils/switchtheme.service';

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
  private theme : boolean;
  subscription:Subscription;
  private accountTheme: any;
  
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
    this.subscription = this.switchthemeService.navItem$
          .subscribe(item => this.theme = item);
          
    if(this.user.isAdmin()){
      this.accountTheme = "admin-theme";
    }
    else{
      this.accountTheme = "user-theme";
    }
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

  onDossiers() {
    this.router.navigate(['/main']);
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
    // prevent memory leak when component is destroyed
      this.subscription.unsubscribe();
  }
}
