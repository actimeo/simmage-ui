import { FilterOrganization } from './../../shared/filters/dossier-situation-filter/dossier-situation-filter.component';
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

  public filtering = false;

  private dosId: number;
  public statuses: Observable<DbDossierStatusHistory[]>;
  public orgs: Observable<FilterOrganization[]>;

  constructor(private route: ActivatedRoute, private dossierStatus: DossierStatusService) { }

  ngOnInit() {
    this.route.parent.params.pluck('id').subscribe((id: string) => {
      this.dosId = +id;
      this.statuses = this.dossierStatus.loadDossierStatusHistory(this.dosId, null, null);

      // Get unique organizations from list of statuses
      this.orgs = this.statuses.map((st: DbDossierStatusHistory[]) => {
        return st.map((s: DbDossierStatusHistory) => ({ org_id: s.org_id, org_name: s.org_name }))
          .reduce((total: FilterOrganization[], one: FilterOrganization) => {
            const org: FilterOrganization = { org_id: one.org_id, org_name: one.org_name };
            if (total.filter((o: FilterOrganization) => o.org_id === org.org_id).length === 0) {
              total.push(org);
            }
            return total;
          }, []);
      });
    });
  }

}
