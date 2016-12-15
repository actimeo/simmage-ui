import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PortalsService, PortalData } from '../../portals.service';

@Component({
  selector: 'app-main-sidenav',
  templateUrl: './main-sidenav.component.html',
  styleUrls: ['./main-sidenav.component.css']
})
export class MainSidenavComponent implements OnInit, OnDestroy {

  public portalData: PortalData;
  private subscription: Subscription;

  constructor(private portals: PortalsService) {
    // subscribe to get next pushes of portalData
    this.subscription = this.portals.portalDataState
      .distinctUntilChanged()
      .subscribe((portalData: PortalData) => this.portalData = portalData);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
