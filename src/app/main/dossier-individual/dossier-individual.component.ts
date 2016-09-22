import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dossier-individual',
  templateUrl: './dossier-individual.component.html',
  styleUrls: ['./dossier-individual.component.css']
})
export class DossierIndividualComponent implements OnInit {
  @Input() dossier;

  constructor() { }

  ngOnInit() {
  }

}
