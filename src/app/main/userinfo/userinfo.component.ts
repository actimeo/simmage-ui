import { DbDossier } from './../../db-models/organ';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UserService } from '../../user.service';
import { UserData } from '../../data/user-data';
import { DbPortal } from '../../db-models/portal';
import { DbGroup } from '../../db-models/organ';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  //  private userData: UserData;
  public username: Observable<string>;

  public portals: Observable<DbPortal[]>;
  public groups: Observable<DbGroup[]>;
  public dossiers: Observable<DbDossier[]>;

  public selectedPorId: Observable<number>;
  public selectedGrpId: Observable<number>;
  public selectedDosId: Observable<number>;

  constructor(private user: UserService) {
    // subscribe to get next pushes of userData
    this.username = this.user.userDataState
      .map((u: UserData) => u.getFullName());

    this.portals = this.user.userDataState
      .map((u: UserData) => u.getPortals());

    this.groups = this.user.userDataState
      .map((u: UserData) => u.getGroups());

    this.dossiers = this.user.userDataState
      .map((u: UserData) => u.getDossiers());

    this.selectedPorId = this.user.userDataState
      .map((u: UserData) => u.selectedPorId);

    this.selectedGrpId = this.user.userDataState
      .map((u: UserData) => u.selectedGrpId);

    this.selectedDosId = this.user.userDataState
      .map((u: UserData) => u.selectedDosId);
  }

  ngOnInit() {
  }

  public selectPortal(porId) {
    this.user.selectPortal(porId);
  }

  public selectGroup(grpId) {
    this.user.selectGroup(grpId);
  }

  public selectDossier(dosId) {
    this.user.selectDossier(dosId);
  }
}
