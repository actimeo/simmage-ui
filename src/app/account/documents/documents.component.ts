import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { DocumentsService } from '../../services/backend/documents.service';
import { Observable } from 'rxjs/Observable';
import { DocumentJson } from '../../services/backend/db-models/json';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  animations: [
    trigger('docOnFocus', [
      state('true', style({ 'flex-basis': '100%'})),
      state('false', style({ })),
      transition('* => *', animate('250ms'))
    ])
  ]
})
export class DocumentsComponent implements OnInit {

  private focusedDoc: number;

  documentsResponsible: DocumentJson[];
  documentsCreated: DocumentJson[];
documentsGlobals: DocumentJson[];

  constructor(private service: DocumentsService) { }

  ngOnInit() {
    this.service.loadDocumentsForUser().subscribe(documents => {
      this.documentsCreated = documents.filter(d => d.author.par_firstname == JSON.parse(localStorage['auth_firstname'])
                                                  && d.author.par_lastname == JSON.parse(localStorage['auth_lastname']));
      this.documentsResponsible = documents.filter(d => d.responsible ? d.responsible.par_firstname == JSON.parse(localStorage['auth_firstname'])
                                                      && d.responsible.par_lastname == JSON.parse(localStorage['auth_lastname']) : null);
      this.documentsGlobals = documents.filter(d => d.dossiers == null);
    });
  }

  toggleFocus(id: number) {
    this.focusedDoc = this.focusedDoc !== id ? id : null;
  }

}
