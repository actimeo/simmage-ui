import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { NotesService } from '../../shared/notes.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NoteJson } from '../../db-models/json';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  animations: [
    trigger('noteOnFocus', [
      state('true', style({ 'flex-basis': '100%' })),
      state('false', style({ })),
      transition('* => *', animate('250ms'))
    ])
  ]
})
export class NotesComponent implements OnInit {

  private focusedNote: number;

  //orderByEvent: boolean = false;
  //subOBE: Subscription;

  notesReceived: NoteJson[];
  notesSent: NoteJson[];

  //obsNR: Observable<NoteJson[]>;

  constructor(private service: NotesService) { }

  ngOnInit() {
    this.service.loadNotesForUser().subscribe(notes => {
      //console.log(notes);
      this.notesReceived = notes.filter(n => n.recipients.filter(r => r.par_firstname == JSON.parse(localStorage['auth_firstname'])
                                                                    && r.par_lastname == JSON.parse(localStorage['auth_lastname'])).length > 0);
      /*this.subOBE = Observable.of(this.orderByEvent).distinctUntilChanged().subscribe(() => {
        this.notesReceived = this.notesReceived.sort((a, b) => { return a.not_creation_date < b.not_creation_date ? -1 : a.not_creation_date > b.not_creation_date ? 1 : 0 });
      });
      this.obsNR = Observable.of(this.notesReceived).distinctUntilChanged();*/
      this.notesSent = notes.filter(n => n.author.par_firstname == JSON.parse(localStorage['auth_firstname'])
                                      && n.author.par_lastname == JSON.parse(localStorage['auth_lastname']));
    });
  }

  toggleFocus(id: number) {
    this.focusedNote = this.focusedNote !== id ? id : null;
  }

  /*toggleOrder(order: boolean) {
    this.orderByEvent = order;
  }*/

}
