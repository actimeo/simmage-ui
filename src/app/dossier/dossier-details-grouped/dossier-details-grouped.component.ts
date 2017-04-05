import { DossierInfoJson } from './../../services/backend/db-models/json';
import { ReduxService } from './../../services/utils/redux.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dossier-details-grouped',
  templateUrl: './dossier-details-grouped.component.html',
  styleUrls: ['./dossier-details-grouped.component.css']
})
export class DossierDetailsGroupedComponent implements OnInit {

  @Input() dossier: DossierInfoJson;

  constructor(private redux: ReduxService) { }

  ngOnInit() {
  }

}
