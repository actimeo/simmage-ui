import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DbGroup } from '../../db-models/organ';
import { DossiersService } from '../../db-services/dossiers.service';

@Component({
  selector: 'app-dossier-grouped',
  templateUrl: './dossier-grouped.component.html',
  styleUrls: ['./dossier-grouped.component.css']
})
export class DossierGroupedComponent implements OnInit {
  @Input() dossier;

  public assignments: Observable<DbGroup[]>;

  constructor(private dossiersService: DossiersService) { }

  ngOnInit() {
    this.assignments = this.dossiersService.loadDossierAssignments(this.dossier.dos_id);
  }
}
