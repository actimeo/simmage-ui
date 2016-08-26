import { Component, OnInit } from '@angular/core';

import { PortalsService, PortalData } from '../../portals.service';

@Component({
  selector: 'app-main-sidenav',
  templateUrl: 'main-sidenav.component.html',
  styleUrls: ['main-sidenav.component.css']
})
export class MainSidenavComponent implements OnInit {

  public portalData: PortalData;

  constructor(private portals: PortalsService) {
    // subscribe to get next pushes of portalData
    this.portals.portalDataState.subscribe((portalData) => {
      console.log('must display portal: ' + portalData.porId);
      console.log(portalData);
      this.portalData = portalData;
    });
  }

  ngOnInit() {
  }
}
