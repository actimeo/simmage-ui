import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { UsergroupService } from '../../../db-services/usergroup.service';
import { DbPortal } from '../../../db-models/portal';

@Component({
  selector: 'app-search-portals',
  templateUrl: './search-portals.component.html',
  styleUrls: ['./search-portals.component.css']
})
export class SearchPortalsComponent implements OnInit, OnDestroy {
  @Input() authorizedPortals: DbPortal[];

  private portalsFromDB: DbPortal[];
  private portals: DbPortal[];
  private tempPortals: DbPortal[];

  portalSubscribe: Subscription;
  portalAutocomplete: boolean = false;

  portalSelector: FormGroup;
  portalsCtrl: FormControl;
  portalInputCtrl: FormControl;

  errorMsg: string = '';

  constructor(private ugs: UsergroupService, private fb: FormBuilder) { }

  ngOnInit() {
    this.portalInputCtrl = new FormControl('');
    this.portalsCtrl = new FormControl('');

    this.portalSelector = this.fb.group({
      portalInput: this.portalInputCtrl,
      portals: this.portalsCtrl
    });

    this.portalSubscribe = this.portalInputCtrl.valueChanges.debounceTime(300).distinctUntilChanged().subscribe(p => this.searchPortal(p));

    this.ugs.loadPortals().subscribe(portals => {
      this.portals = portals;
      this.portalsFromDB = portals;
    });
  }

  ngOnDestroy() {
    this.portalSubscribe.unsubscribe();
  }

  addPortal(event) {
    event.preventDefault();
    this.errorMsg = '';
    this.portalsFromDB.forEach(p => {
      if (p.por_id === +this.portalsCtrl.value) {
        if (this.authorizedPortals.indexOf(p) === -1) {
          this.authorizedPortals.push(p);
        } else {
          this.errorMsg = 'This portal is already inside the list';
        }
        return;
      }
    });
  }

  removePortal(index) {
    this.errorMsg = '';
    this.authorizedPortals.splice(index, 1);
  }

  private searchPortal(value: string) {
    if (value.length < 3) {
      this.portals = this.portalsFromDB;
      this.portalAutocomplete = false;
      return;
    }
    this.tempPortals = [];
    this.portalAutocomplete = true;

    this.portalsFromDB.forEach(p => {
      let pname: string = p.por_name;
      if (pname.match(new RegExp(value, 'i'))) {
        this.tempPortals.push(p);
      }
    });
    this.portals = this.tempPortals;
  }

}
