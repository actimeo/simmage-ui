import { DbPortal } from '../db-models/portal';
import { DbGroup } from '../db-models/organ';
import { Constants } from '../constants';
import { UserLoginJson } from '../user.service';

export class UserData {
  public loggedIn: boolean;
  public token: number;
  public rights: string[] = null;
  public usergroupId: number;
  public login: string;
  public firstname: string = '';
  public lastname: string = '';
  public portals: DbPortal[];
  public groups: DbGroup[];

  public selectedPorId: number;
  public selectedGrpId: number;

  public static buildFromLocalStorage() {
    let ret = new UserData(null);
    ret.loggedIn = !!localStorage.getItem(Constants.KEY_AUTH_TOKEN);
    if (ret.loggedIn) {
      ret.token = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_TOKEN));
      ret.rights = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_RIGHTS)) || [];
      ret.usergroupId = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_UGR_ID));
      ret.login = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_LOGIN)) || '';
      ret.firstname = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_FIRSTNAME)) || '';
      ret.lastname = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_LASTNAME)) || '';

      ret.selectedPorId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_POR_ID)) || 0;
      ret.selectedGrpId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_GRP_ID)) || 0;
    }
    return ret;
  }

  public constructor(res: UserLoginJson) {
    if (res !== null) {
      this.loggedIn = true;
      this.token = res.usr_token;
      this.rights = res.usr_rights || [];
      this.usergroupId = res.usergroup ? res.usergroup.ugr_id : 0;
      this.firstname = res.participant ? res.participant.par_firstname : '';
      this.lastname = res.participant ? res.participant.par_lastname : '';
      this.portals = [];
      this.groups = [];
      this.selectedPorId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_POR_ID)) || 0;
      this.selectedGrpId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_GRP_ID)) || 0;
    }
  }

  public saveToLocalStorage() {
    if (this.loggedIn) {
      localStorage.setItem(Constants.KEY_AUTH_TOKEN, JSON.stringify(this.token));
      localStorage.setItem(Constants.KEY_AUTH_RIGHTS, JSON.stringify(this.rights));
      localStorage.setItem(Constants.KEY_AUTH_UGR_ID, JSON.stringify(this.usergroupId));
      localStorage.setItem(Constants.KEY_AUTH_LOGIN, JSON.stringify(this.login));
      localStorage.setItem(Constants.KEY_AUTH_FIRSTNAME, JSON.stringify(this.firstname));
      localStorage.setItem(Constants.KEY_AUTH_LASTNAME, JSON.stringify(this.lastname));

      localStorage.setItem(Constants.KEY_SEL_POR_ID, JSON.stringify(this.selectedPorId));
      localStorage.setItem(Constants.KEY_SEL_GRP_ID, JSON.stringify(this.selectedGrpId));
    } else {
      localStorage.removeItem(Constants.KEY_AUTH_TOKEN);
      localStorage.removeItem(Constants.KEY_AUTH_RIGHTS);
      localStorage.removeItem(Constants.KEY_AUTH_RIGHTS);
      localStorage.removeItem(Constants.KEY_AUTH_UGR_ID);
      localStorage.removeItem(Constants.KEY_AUTH_LOGIN);
      localStorage.removeItem(Constants.KEY_AUTH_FIRSTNAME);
      localStorage.removeItem(Constants.KEY_AUTH_LASTNAME);
    }
  }

  public getFullName() {
    let ret = this.firstname + ' ' + this.lastname;
    return ret !== ' ' ? ret : '(' + this.login + ')';
  }

  public setPortals(res: any[]) {
    this.portals = res;
    if (this.portals.length === 1) {
      this.selectedPorId = this.portals[0].por_id;
    } else if (this.portals.length === 0) {
      this.selectedPorId = 0;
    }
    // TODO set selected = 0 if selected not in portals
    this.saveToLocalStorage();
  }

  public getPortals() {
    return this.portals;
  }

  public setGroups(res: any[]) {
    this.groups = res;
    if (this.groups.length === 1) {
      this.selectedGrpId = this.groups[0].grp_id;
    } else if (this.groups.length === 0) {
      this.selectedGrpId = 0;
    }
    // TODO set selected = 0 if selected not in groups
    this.saveToLocalStorage();
  }

  public getGroups() {
    return this.groups;
  }

  public hasRight(r: string) {
    return this.rights.indexOf(r) >= 0;

  }
}
