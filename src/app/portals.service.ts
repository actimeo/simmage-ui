import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import './rxjs_operators';

import { DbMainsection, DbMainmenu } from './db-models/portal';
import { UserService, UserData } from './user.service';
import { PgService } from './pg.service';

export class PortalData {
  public porId: number;

  public mainSections: DbMainsection[];
  public mainMenus: DbMainmenu[];
}

@Injectable()
export class PortalsService {

  // All the loaded portals
  public portalsData: PortalData[];

  // Observable to publish selected portal
  public portalDataState: Observable<PortalData>;
  private portalDataObserver: any;

  constructor(private user: UserService, private pg: PgService) {

    this.portalsData = new Array<PortalData>();

    this.portalDataState = new Observable<PortalData>(observer => {
      this.portalDataObserver = observer;

      // listen to http-Load portals when necessary
      this.user.userDataState
        .map((userData: UserData) => userData.selectedPorId)
        .distinctUntilChanged()
        .subscribe((newPorId: number) => {
          this.loadPortal(newPorId);
        });
    }).share();
  }

  public loadPortal(porId: number) {
    let sourceMain = this.pg.pgcall(
      'portal/mainsection_list', {
        prm_token: this.user.userData.token,
        prm_por_id: porId
      })
      // Save loaded main sections and return the mse_ids
      .map((res: DbMainsection[]) => {
        let newPortal = new PortalData();
        newPortal.porId = porId;
        newPortal.mainSections = res;
        newPortal.mainMenus = new Array<DbMainmenu>();
        this.portalsData.push(newPortal);
        return { portal: newPortal, ids: res.map((section: DbMainsection) => section.mse_id) };
      });

    // For each main section in the portal, get the main menus and flat-add them to the portal
    sourceMain.subscribe(v => {
      v.ids.map(mseId => {
        this.loadMainsection(v.portal, mseId)
          .subscribe(res => res.map(re => v.portal.mainMenus.push(re)));
      });
      this.portalDataObserver.next(v.portal);
    });
  }

  public loadMainsection(newPortal: PortalData, mseId: number) {
    let sourceSection = this.pg.pgcall(
      'portal/mainmenu_list', {
        prm_token: this.user.userData.token,
        prm_mse_id: mseId
      }).reduce((state, value) => { state.push(value); return state; });
    return sourceSection;
  }
}
