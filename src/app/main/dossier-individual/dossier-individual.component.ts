import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DbGroup } from '../../db-models/organ';
import { DossiersService } from '../../db-services/dossiers.service';

@Component({
  selector: 'app-dossier-individual',
  templateUrl: './dossier-individual.component.html',
  styleUrls: ['./dossier-individual.component.css']
})
export class DossierIndividualComponent implements OnInit {
  @Input() dossier;
  public assignments: Observable<DbGroup[]>;

  constructor(private dossiersService: DossiersService) { }

  ngOnInit() {
    this.assignments = this.dossiersService.loadDossierAssignments(this.dossier.dos_id);
  }

}
