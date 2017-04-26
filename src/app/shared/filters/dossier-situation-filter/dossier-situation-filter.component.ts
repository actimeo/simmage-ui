import { DbOrganization } from './../../../services/backend/db-models/organ';
import { OrganService } from './../../../services/backend/organ.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

export interface DossierSituationFilterValue {
  status: string;
  organization: string;
}

@Component({
  selector: 'app-dossier-situation-filter',
  templateUrl: './dossier-situation-filter.component.html',
  styleUrls: ['./dossier-situation-filter.component.css']
})
export class DossierSituationFilterComponent implements OnInit {

  public filterValues$ = new BehaviorSubject<DossierSituationFilterValue>({
    status: '',
    organization: ''
  });

  form: FormGroup;
  statusCtrl: FormControl;
  organizationCtrl: FormControl;

  public orgs: Observable<DbOrganization[]>;

  constructor(private fb: FormBuilder, private organs: OrganService) {
    this.createForm();
    this.orgs = this.organs.loadOrganizations(true);
  }

  ngOnInit() {
  }

  private createForm() {
    this.statusCtrl = new FormControl('');
    this.organizationCtrl = new FormControl('');
    this.form = this.fb.group({
      status: this.statusCtrl,
      organization: this.organizationCtrl
    });

    this.form.valueChanges.subscribe((e: DossierSituationFilterValue) => {
      this.filterValues$.next(e);
    });
  }

}
