import { DbDossier } from './../services/backend/db-models/organ';
import { DbPortal } from '../services/backend/db-models/portal';
import { DbGroup } from '../services/backend/db-models/organ';
import { UserLoginJson } from '../services/backend/db-models/json';
import { Constants } from '../constants';

export class UserData {
  public loggedIn: boolean;
  public token: number;
  public rights: string[] = null;
  public usergroupId: number;
  public login: string;
  public firstname = '';
  public lastname = '';
  public portals: DbPortal[];
  public groups_dossiers: DbGroup[];
  public dossiers: DbDossier[];

  public selectedPorId: number;
  public selectedGrpId: number;
  public selectedDosId: number;

  public static buildFromLocalStorage() {
    const ret = new UserData(null);
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
      ret.selectedDosId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_DOS_ID)) || 0;
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
      this.groups_dossiers = [];
      this.selectedPorId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_POR_ID)) || 0;
      this.selectedGrpId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_GRP_ID)) || 0;
      this.selectedDosId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_DOS_ID)) || 0;
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
      localStorage.setItem(Constants.KEY_SEL_DOS_ID, JSON.stringify(this.selectedDosId));
    } else {
      localStorage.removeItem(Constants.KEY_AUTH_TOKEN);
      localStorage.removeItem(Constants.KEY_AUTH_RIGHTS);
      localStorage.removeItem(Constants.KEY_AUTH_UGR_ID);
      localStorage.removeItem(Constants.KEY_AUTH_LOGIN);
      localStorage.removeItem(Constants.KEY_AUTH_FIRSTNAME);
      localStorage.removeItem(Constants.KEY_AUTH_LASTNAME);
    }
  }

  public getFullName() {
    const ret = this.firstname + ' ' + this.lastname;
    return ret !== ' ' ? ret : '(' + this.login + ')';
  }

  public setPortals(res: any[]) {
    this.portals = res;
    if (this.portals.length === 1) {
      this.selectedPorId = this.portals[0].por_id;
    } else if (this.portals.length === 0) {
      this.selectedPorId = 0;
    }
    if (this.selectedPorId !== 0
      && this.portals.length > 0
      && this.portals.map(p => p['por_id']).indexOf(this.selectedPorId) === -1) {
      this.selectedPorId = 0;
    }
    this.saveToLocalStorage();
  }

  public getPortals() {
    return this.portals;
  }

  public setGroups(res: any[]) {
    this.groups_dossiers = res;
    if (!res) {
      return;
    }
    if (this.groups_dossiers.length === 1) {
      this.selectedGrpId = this.groups_dossiers[0].grp_id;
    } else if (this.groups_dossiers.length === 0) {
      this.selectedGrpId = 0;
    }
    if (this.selectedGrpId !== 0
      && this.groups_dossiers.length > 0
      && this.groups_dossiers.map(g => g['grp_id']).indexOf(this.selectedGrpId) === -1) {
      this.selectedGrpId = 0;
    }
    this.saveToLocalStorage();
  }

  public getGroups() {
    return this.groups_dossiers;
  }

  public getDossiers(grouped: boolean) {
    if (this.dossiers) {
      return this.dossiers.filter((d: DbDossier) => d.dos_grouped === grouped);
    } else {
      return [];
    }
  }

  public setDossiers(dossiers: DbDossier[]) {
    this.dossiers = dossiers;
  }

  public hasRight(r: string) {
    return this.rights.indexOf(r) >= 0;
  }
}
