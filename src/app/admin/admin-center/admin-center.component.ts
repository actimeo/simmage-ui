import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../user.service';
import { DeviceService } from '../../device.service';

@Component({
  // no need:  selector: 'app-admin-center',
  templateUrl: './admin-center.component.html',
  styleUrls: ['./admin-center.component.css']
})
export class AdminCenterComponent implements OnInit, OnDestroy {

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  private isMobile: boolean = false;
  private sub: Subscription;
  private tuto  = false;
  private theme = false;

  constructor(private user: UserService, public router: Router,
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
  }

  onLogout() {
    this.user.logout();
  }

  onMain() {
    this.router.navigate(['/']);
  }

  isUser(): boolean {
    return this.user.isUser();
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


  //active ou desactive le mode tutoriel
  onTutoClicked() {
      if (this.tuto == false){
          this.tuto = true
          console.log("tuto is enable");
      }
      else if (this.tuto == true){
          this.tuto = false
          console.log("tuto is disable");
      }
  }
  //change le thème
  onThemeClicked() {
      if (this.theme == false){
          this.theme = true
          console.log("theme is light");
          this.changerTheme("#eceff1");
      }
      else if (this.theme == true){
          this.theme = false
          console.log("theme is dark");
          this.changerTheme("black");
      }
  }

  changerTheme(color){
    /*
      var content_toolbar = document.getElementsByClassName('content-toolbar');
      var i = 0;
      var nbmax = content_toolbar.length;
      for (i=0;i<nbmax;i++){
        console.log(content_toolbar);
        content_toolbar[i].style.backgroundColor = color;  
      }
      */
  }
}