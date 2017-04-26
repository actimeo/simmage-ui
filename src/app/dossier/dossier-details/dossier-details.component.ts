import { MdSidenav } from '@angular/material';
import { DeviceService } from './../../services/utils/device.service';
import { SwitchthemeService } from './../../services/utils/switchtheme.service';
import { Subscription } from 'rxjs/Subscription';
import { DossierInfoJson } from './../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { ReduxService } from './../../services/utils/redux.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dossier-details',
  templateUrl: './dossier-details.component.html',
  styleUrls: ['./dossier-details.component.css']
})
export class DossierDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MdSidenav;

  public isMobile = false;
  public dossier: DossierInfoJson;
  private subs: Subscription[] = [];
  public theme: boolean;

  constructor(private switchthemeService: SwitchthemeService,
    private route: ActivatedRoute, public redux: ReduxService,
    private device: DeviceService, private router: Router,
  ) { }

  ngOnInit() {
    this.subs.push(this.device.deviceType$.subscribe(t => {
      setTimeout(() => { //WHY?
        this.isMobile = t === 'mobile';
        if (this.isMobile) {
          this.sidenav.mode = 'over';
          if (!this.router.url.match(/^\/dossier\/\d+$/)) { // '/dossier/:id', root of dossier
            this.sidenav.close();
          }
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      }, 0);
    }));
    this.subs.push(this.route.data.pluck('data').subscribe((dossier: DossierInfoJson) => this.dossier = dossier));
    this.subs.push(this.switchthemeService.navItem$.subscribe(item => this.theme = item));
    this.subs.push(this.redux.sidenavClicked$.subscribe(() => this.onSidenavClicked()));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onSidenavClicked() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }

}
