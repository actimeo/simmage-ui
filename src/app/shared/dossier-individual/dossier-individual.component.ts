import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dossier-individual',
  templateUrl: './dossier-individual.component.html',
  styleUrls: ['./dossier-individual.component.css']
})
export class DossierIndividualComponent {
  @Input() dossier;

  genderSymbol(gender: string) {
    if (gender === 'male') {
      return '♂';
    } else if (gender === 'female') {
      return '♀';
    }
  }
}
