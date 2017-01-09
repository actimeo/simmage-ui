import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DbGroup, DbDossierOrganizationStatus } from '../../../../db-models/organ';
import { DossiersService } from '../../../../dossiers.service';

@Component({
  selector: 'app-dossier-grouped',
  templateUrl: './dossier-grouped.component.html',
  styleUrls: ['./dossier-grouped.component.css']
})
export class DossierGroupedComponent implements OnInit {
  @Input() dossier;

  public assignments: Observable<DbGroup[]>;
  public statuses: Observable<DbDossierOrganizationStatus[]>;

  constructor(private dossiersService: DossiersService) { }

  ngOnInit() {
    this.assignments = this.dossiersService.loadDossierAssignments(this.dossier.dos_id);
    this.statuses = this.dossiersService.loadDossierStatuses(this.dossier.dos_id);
  }
}
