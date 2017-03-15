import { ReduxService } from './../../services/utils/redux.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dossier-details',
  templateUrl: './dossier-details.component.html',
  styleUrls: ['./dossier-details.component.css']
})
export class DossierDetailsComponent implements OnInit {

  constructor(private redux: ReduxService) { }

  ngOnInit() {
  }

}
