import { Component, OnInit, Input } from '@angular/core';

export interface FilterOrganization {
  org_id: number;
  org_name: string;
}

@Component({
  selector: 'app-dossier-situation-filter',
  templateUrl: './dossier-situation-filter.component.html',
  styleUrls: ['./dossier-situation-filter.component.css']
})
export class DossierSituationFilterComponent implements OnInit {

  @Input() organizations: FilterOrganization[];

  constructor() { }

  ngOnInit() {
  }

}
