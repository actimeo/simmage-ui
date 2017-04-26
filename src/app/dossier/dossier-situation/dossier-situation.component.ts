import {
  DossierSituationFilterComponent,
  DossierSituationFilterValue
} from './../../shared/filters/dossier-situation-filter/dossier-situation-filter.component';
import { ActivatedRoute } from '@angular/router';
import { DbDossierStatusHistory } from './../../services/backend/db-models/organ';
import { Observable } from 'rxjs/Observable';
import { DossierStatusService } from './../../services/backend/dossier-status.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import '../../rxjs_operators';

@Component({
  selector: 'app-dossier-situation',
  templateUrl: './dossier-situation.component.html',
  styleUrls: ['./dossier-situation.component.css']
})
export class DossierSituationComponent implements OnInit {

  @ViewChild('filter') filter: DossierSituationFilterComponent;

  public filtering = false;

  private dosId: number;
  public statuses: Observable<DbDossierStatusHistory[]>;

  private id$: Observable<string>;

  constructor(private route: ActivatedRoute, private dossierStatus: DossierStatusService) { }

  ngOnInit() {
    this.id$ = this.route.parent.params.pluck('id');

    Observable.combineLatest(this.id$, this.filter.filterValues$)
      .subscribe(([id, filter]: [string, DossierSituationFilterValue]) => {
        this.dosId = +id;
        if (filter.status === '') {
          filter.status = null;
        }
        let filterOrg = +filter.organization;
        if (filterOrg === 0) {
          filterOrg = null;
        }
        this.statuses = this.dossierStatus.loadDossierStatusHistory(this.dosId, filterOrg, filter.status);
      });
  }

}
