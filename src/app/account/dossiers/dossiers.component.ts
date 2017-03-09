import { ActivatedRoute } from '@angular/router';
import { DbDossier } from './../../services/backend/db-models/organ';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dossiers',
  templateUrl: './dossiers.component.html',
  styleUrls: ['./dossiers.component.css']
})
export class DossiersComponent implements OnInit {

  public dossiers: Observable<DbDossier[]> = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.dossiers = this.route.data.pluck('data');
  }

}
