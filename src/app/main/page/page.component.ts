import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DossiersService } from '../../db-services/dossiers.service';
import { DbDossier } from '../../db-models/organ';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  private mmeId: number;

  private dossiersPatientData: Observable<DbDossier[]> = null;
  private dossiersFamilyData: Observable<DbDossier[]> = null;
  private dossiersIndivContactData: Observable<DbDossier[]> = null;
  private dossiersFamilyContactData: Observable<DbDossier[]> = null;

  constructor(private r: ActivatedRoute, private dossiers: DossiersService) {
  }

  ngOnInit() {
    // params can change after first initialization, for example
    // if we navigate directly to a new page detail
    this.r.params.subscribe(params => this.mmeId = +params['id']);

    this.dossiersPatientData = this.dossiers.dossiersPatientState;
    this.dossiersFamilyData = this.dossiers.dossiersFamilyState;
    this.dossiersIndivContactData = this.dossiers.dossiersIndivContactState;
    this.dossiersFamilyContactData = this.dossiers.dossiersFamilyContactState;
  }
}
