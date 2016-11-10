import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DbMainmenu } from './../../db-models/portal';
import { UserService } from '../../user.service';
import { DossiersService } from '../../dossiers.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnDestroy {

  /*
    private mmeId: number;
    private subs: Subscription[] = [];
    private dossiersPatientData: Observable<DbDossier[]> = null;
    private dossiersFamilyData: Observable<DbDossier[]> = null;
    private dossiersIndivContactData: Observable<DbDossier[]> = null;
    private dossiersFamilyContactData: Observable<DbDossier[]> = null;
  */

  private mainmenu: Observable<DbMainmenu>;

  constructor(private r: ActivatedRoute, private dossiers: DossiersService,
    private user: UserService) {
  }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck<DbMainmenu>('data');

    /*
        this.subs.push(this.r.params.subscribe(params => this.mmeId = +params['id']));
    
        this.subs.push(this.user.userDataState
          .map((u: UserData) => u.selectedGrpId)
          .distinctUntilChanged()
          .subscribe(grpId => this.loadDossiers(grpId)));
    */
  }

  ngOnDestroy() {
    //    this.subs.forEach(sub => sub.unsubscribe());
  }
  /*
    private loadDossiers(grpId: number) {
      this.dossiersPatientData = this.dossiers.loadDossiers(false, false, grpId);
      this.dossiersFamilyData = this.dossiers.loadDossiers(true, false, grpId);
      this.dossiersIndivContactData = this.dossiers.loadDossiers(false, true, grpId);
      this.dossiersFamilyContactData = this.dossiers.loadDossiers(true, true, grpId);
    }*/
}
