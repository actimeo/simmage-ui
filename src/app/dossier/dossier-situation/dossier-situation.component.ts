import { ActivatedRoute } from '@angular/router';
import { DbDossierStatusHistory } from './../../services/backend/db-models/organ';
import { Observable } from 'rxjs/Observable';
import { DossierStatusService } from './../../services/backend/dossier-status.service';
import { Component, OnInit } from '@angular/core';
import '../../rxjs_operators';

@Component({
  selector: 'app-dossier-situation',
  templateUrl: './dossier-situation.component.html',
  styleUrls: ['./dossier-situation.component.css']
})
export class DossierSituationComponent implements OnInit {

  private dosId: number;
  public statuses: Observable<DbDossierStatusHistory[]>;

  constructor(private route: ActivatedRoute, private dossierStatus: DossierStatusService) { }

  ngOnInit() {
    this.route.parent.params.pluck('id').subscribe((id: string) => {
      this.dosId = +id;
      this.statuses = this.dossierStatus.loadDossierStatusHistory(this.dosId, null, null);
    });
  }

}
