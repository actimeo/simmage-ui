import { DossierInfoJson } from './../../services/backend/db-models/json';
import { ReduxService } from './../../services/utils/redux.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dossier-details-individual',
  templateUrl: './dossier-details-individual.component.html',
  styleUrls: ['./dossier-details-individual.component.css']
})
export class DossierDetailsIndividualComponent implements OnInit {

  @Input() dossier: DossierInfoJson;

  constructor(private redux: ReduxService) { }

  ngOnInit() {
  }

}
