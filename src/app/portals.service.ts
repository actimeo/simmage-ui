import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import './rxjs_operators';

import { UserService } from './user.service';
import { UserData } from './data/user-data';
import { PgService } from './pg.service';

export interface PortalData {
  por_id: number;
  mainsections: {
    mse_id: number;
    mse_name: string;
    mainmenus: {
      mme_id: number;
      mme_name: string;
      mme_content_type: string;
      mme_content_id: number;
    }
  };
}

@Injectable()
export class PortalsService implements OnDestroy {

  // Observable to publish selected portal
  public portalDataState: BehaviorSubject<PortalData> = new BehaviorSubject<PortalData>(null);
  private userSubscription: Subscription;

  constructor(private user: UserService, private pg: PgService) {
    // listen for change on selected portal
    // and load portal info from backend
    this.userSubscription = this.user.userDataState
      .map((userData: UserData) => userData.selectedPorId)
      .distinctUntilChanged()
      .filter(id => id > 0) // TODO is it possible to have no portal (= 0) for an admin?
      .subscribe((newPorId: number) => this.loadPortal(newPorId));
  }

  private loadPortal(newPorId: number) {
    let req = {
      por_id: true,
      mainsections: {
        mse_id: true,
        mse_name: true,
        mainmenus: {
          mme_id: true,
          mme_name: true,
          mme_icon: true,
          mme_content_type: true,
          mme_content_id: true
        }
      }
    };
    this.pg.pgcall('portal/portal_json', {
      prm_por_id: newPorId,
      req: JSON.stringify(req)
    }).subscribe(data => this.portalDataState.next(data.pop()));
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  // Other functions
  loadPortals() {
    return this.pg.pgcall('portal/portal_list', {
    });
  }

  addPortal(name: string, description: string) {
    return this.pg.pgcall('portal/portal_add', {
      prm_name: name,
      prm_description: description
    });
  }

  getPortal(id: number) {
    return this.pg.pgcall('portal/portal_get', {
      prm_id: id
    });
  }

  updatePortal(id: number, name: string, description: string) {
    return this.pg.pgcall('portal/portal_rename', {
      prm_id: id,
      prm_name: name,
      prm_description: description
    });
  }

  deletePortal(id: number) {
    return this.pg.pgcall('portal/portal_delete', {
      prm_id: id
    });
  }

  cleanPortal(id: number) {
    return this.pg.pgcall('portal/portal_clean', {
      prm_id: id
    });
  }

  getMainmenu(id: number) {
    return this.pg.pgcall('portal/mainmenu_get', {
      prm_mme_id: id
    });
  }
}
