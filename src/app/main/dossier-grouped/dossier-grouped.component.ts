import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dossier-grouped',
  templateUrl: './dossier-grouped.component.html',
  styleUrls: ['./dossier-grouped.component.css']
})
export class DossierGroupedComponent implements OnInit {
  @Input() dossier;

  constructor() { }

  ngOnInit() {
  }

}
