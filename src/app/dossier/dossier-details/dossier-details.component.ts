import { DossierInfoJson } from './../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { ReduxService } from './../../services/utils/redux.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dossier-details',
  templateUrl: './dossier-details.component.html',
  styleUrls: ['./dossier-details.component.css']
})
export class DossierDetailsComponent implements OnInit {

  public dossier: Observable<DossierInfoJson>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.dossier = this.route.data.pluck('data');
  }
}
