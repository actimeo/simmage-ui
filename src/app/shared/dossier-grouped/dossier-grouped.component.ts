import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dossier-grouped',
  templateUrl: './dossier-grouped.component.html',
  styleUrls: ['./dossier-grouped.component.css']
})
export class DossierGroupedComponent {
  @Input() dossier;
}
