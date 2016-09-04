import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import '../rxjs_operators';

import { DbMainsection, DbMainmenu } from '../db-models/portal';
import { UserService, UserData } from './user.service';
import { PgService } from '../pg.service';

export class PortalData {
  public porId: number;

  public mainSections: DbMainsection[];
  public mainMenus: DbMainmenu[];
}

@Injectable()
export class PortalsService implements OnDestroy {

  // Observable to publish selected portal
  public portalDataState: Observable<PortalData>;
  private portalDataObserver: Subject<PortalData>;

  private userSubscription: Subscription;

  constructor(private user: UserService, private pg: PgService) {

    // Create observable: it will send the data of new selected portal
    this.portalDataObserver = new Subject<PortalData>();
    this.portalDataState = this.portalDataObserver.asObservable();

    // listen for change on selected portal
    // and load portal info from backend
    this.userSubscription = this.user.userDataState
      .map((userData: UserData) => userData.selectedPorId)
      .distinctUntilChanged()
      .filter(id => id > 0) // TODO is it possible to have no portal (= 0) for an admin?
      .subscribe((newPorId: number) => this.loadPortal(newPorId));
  }

  /* We create a PortalData structure with the provided porId,
   * then load mainsections and store them in structure
   * then load mainmenus in parallel and store them in structure.
   * At the end we push the complete structure with Observable
   * */
  private loadPortal(newPorId: number) {
    let p: PortalData = new PortalData();
    p.porId = newPorId;

    this.loadMainsections(p)
      .subscribe((mseIds: number[]) => {

        // load in parallel mainmenus from mainsections
        // then merge them all in a single array
        return Observable.from(mseIds)
          .map((mseId: number) => this.loadMainmenus(mseId))
          .mergeAll()
          .reduce((a, b) => { return a.concat(b); }, [])
          .subscribe((mainMenus: DbMainmenu[]) => {
            p.mainMenus = mainMenus;
            this.portalDataObserver.next(p);
          });
      });
  }

  private loadMainsections(p: PortalData) {
    console.log('start loading portal from backend: ' + p.porId);

    let sourceMainsectionList = this.pg.pgcall(
      'portal/mainsection_list', {
        prm_token: this.user.userData.token,
        prm_por_id: p.porId
      })
      // Save loaded main sections and return the mse_ids
      .map((res: DbMainsection[]) => {
        p.mainSections = res;
        return res.map((section: DbMainsection) => section.mse_id);
      });
    return sourceMainsectionList;
  }

  private loadMainmenus(mseId: number) {
    let sourceMainmenus = this.pg.pgcall(
      'portal/mainmenu_list', {
        prm_token: this.user.userData.token,
        prm_mse_id: mseId
      });
    return sourceMainmenus;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
