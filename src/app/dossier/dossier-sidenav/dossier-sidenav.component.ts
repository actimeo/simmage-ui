import { ReduxService } from './../../services/utils/redux.service';
import { Subscription } from 'rxjs/Subscription';
import { PortalData, PortalsService } from './../../services/backend/portals.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dossier-sidenav',
  templateUrl: './dossier-sidenav.component.html',
  styleUrls: ['./dossier-sidenav.component.css']
})
export class DossierSidenavComponent implements OnInit, OnDestroy {

  public portalData: PortalData;
  private subscription: Subscription;

  constructor(private portals: PortalsService, private events: ReduxService) { }

  ngOnInit() {
    this.subscription = this.portals.portalDataState
      .subscribe((portalData: PortalData) => this.portalData = portalData);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onclick() {
    this.events.sidenavClicked();
  }
}
