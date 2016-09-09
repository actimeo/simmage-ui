import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DossiersService } from '../../db-services/dossiers.service';
import { DbDossier } from '../../db-models/organ';

@Component({
  selector: 'app-dossiers',
  templateUrl: './dossiers.component.html',
  styleUrls: ['./dossiers.component.css']
})
export class DossiersComponent implements OnInit {

  private dossiersPatientData: Observable<DbDossier[]> = null;
  private dossiersFamilyData: Observable<DbDossier[]> = null;
  private dossiersIndivContactData: Observable<DbDossier[]> = null;
  private dossiersFamilyContactData: Observable<DbDossier[]> = null;

  constructor(private dossiers: DossiersService) { 
    this.dossiersPatientData = this.dossiers.dossiersPatientState;
    this.dossiersFamilyData = this.dossiers.dossiersFamilyState;
    this.dossiersIndivContactData = this.dossiers.dossiersIndivContactState;
    this.dossiersFamilyContactData = this.dossiers.dossiersFamilyContactState;
  }

  ngOnInit() {
  }

}
