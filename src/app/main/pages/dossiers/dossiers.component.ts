import { Component, OnInit, OnDestroy, Input, Directive, Output, EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { UserData } from './../../../data/user-data';
import { DbDossier } from './../../../db-models/organ';
import { DbMainmenu } from './../../../db-models/portal';
import { UserService } from '../../../services/utils/user.service';
import { DossiersService } from '../../../services/backend/dossiers.service';

@Component({
  selector: 'app-dossiers',
  templateUrl: './dossiers.component.html',
  styleUrls: ['./dossiers.component.css']
})
export class DossiersComponent implements OnInit, OnDestroy {

  public mainmenu: DbMainmenu;

  private subs: Subscription[] = [];
  public grpId: number = null;
  public dossiersPatientData: DbDossier[] = null;
  public dossiersFamilyData: DbDossier[] = null;

  constructor(private r: ActivatedRoute, private user: UserService,
    private dossiers: DossiersService) { }

  ngOnInit() {
    const grpId$ = this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .do((grpId: number) => {
        this.grpId = grpId;
      });

    const mainmenu$ = this.r.data.pluck('data')
      .distinctUntilChanged()
      .do((mainmenu: DbMainmenu) => {
        this.mainmenu = mainmenu;
      });

    this.subs.push(Observable.combineLatest(grpId$, mainmenu$)
      .subscribe(([grpId, mainmenu]: [number, DbMainmenu]) => {
        this.loadDossiers();
      }));

  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadDossiers() {
    this.subs.push(this.dossiers.loadDossiers(false, false, this.grpId, true)
      .subscribe(data => {
        this.dossiersPatientData = data;
      }));
    this.subs.push(this.dossiers.loadDossiers(true, false, this.grpId, true)
      .subscribe(data => this.dossiersFamilyData = data));
  }

  genderSymbol(gender: string) {
    if (gender === 'male') {
      return '♂';
    } else if (gender === 'female') {
      return '♀';
    }
  }
}
