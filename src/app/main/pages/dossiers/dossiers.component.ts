import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { UserData } from './../../../data/user-data';
import { DbDossier } from './../../../db-models/organ';
import { DbMainmenu } from './../../../db-models/portal';
import { UserService } from '../../../user.service';
import { DossiersService } from '../../../dossiers.service';

@Component({
  selector: 'app-dossiers',
  templateUrl: './dossiers.component.html',
  styleUrls: ['./dossiers.component.css']
})
export class DossiersComponent implements OnInit, OnDestroy {

  @Input() mainmenu: DbMainmenu;

  private mmeId: number;
  private subs: Subscription[] = [];
  private dossiersPatientData: Observable<DbDossier[]> = null;
  private dossiersFamilyData: Observable<DbDossier[]> = null;
  private dossiersIndivContactData: Observable<DbDossier[]> = null;
  private dossiersFamilyContactData: Observable<DbDossier[]> = null;

  constructor(private r: ActivatedRoute, private user: UserService,
    private dossiers: DossiersService) { }

  ngOnInit() {
    this.subs.push(this.r.params.subscribe(params => this.mmeId = +params['id']));

    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => this.loadDossiers(grpId)));
  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadDossiers(grpId: number) {
    this.dossiersPatientData = this.dossiers.loadDossiers(false, false, grpId);
    this.dossiersFamilyData = this.dossiers.loadDossiers(true, false, grpId);
    this.dossiersIndivContactData = this.dossiers.loadDossiers(false, true, grpId);
    this.dossiersFamilyContactData = this.dossiers.loadDossiers(true, true, grpId);
  }

  genderSymbol(gender: string) {
    if (gender === 'male') {
      return '♂';
    } else if (gender === 'female') {
      return '♀';
    }
  }
}
