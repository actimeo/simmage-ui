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

  public mainmenu: DbMainmenu;

  private subs: Subscription[] = [];
  public grpId: number = null;
  public dossiersPatientData: DbDossier[] = null;
  public dossiersFamilyData: DbDossier[] = null;
  public dossiersIndivContactData: DbDossier[] = null;
  public dossiersFamilyContactData: DbDossier[] = null;

  constructor(private r: ActivatedRoute, private user: UserService,
    private dossiers: DossiersService) { }

  ngOnInit() {
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.grpId = grpId;
        this.loadDossiers();
      }));

    this.subs.push(this.r.data.pluck('data')
      .distinctUntilChanged().subscribe((data: DbMainmenu) => {
        this.mainmenu = data;
        this.loadDossiers();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadDossiers() {
    this.dossiers.loadDossiers(false, false, this.grpId).subscribe(data => this.dossiersPatientData = data);
    this.dossiers.loadDossiers(true, false, this.grpId).subscribe(data => this.dossiersFamilyData = data);
    this.dossiers.loadDossiers(false, true, this.grpId).subscribe(data => this.dossiersIndivContactData = data);
    this.dossiers.loadDossiers(true, true, this.grpId).subscribe(data => this.dossiersFamilyContactData = data);
  }

  genderSymbol(gender: string) {
    if (gender === 'male') {
      return '♂';
    } else if (gender === 'female') {
      return '♀';
    }
  }
}
