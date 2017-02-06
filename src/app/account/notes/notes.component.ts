import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { NotesService } from '../../shared/notes.service';
import { Observable } from 'rxjs/Observable';
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

  notesReceived: NoteJson[];
  notesSent: NoteJson[];

  constructor(private service: NotesService) { }

  ngOnInit() {
    this.service.loadNotesForUser().subscribe(notes => {
      
      this.notesReceived = notes.filter(n => n.recipients.filter(r => r.par_firstname == JSON.parse(localStorage['auth_firstname'])
                                                                    && r.par_lastname == JSON.parse(localStorage['auth_lastname'])).length > 0);
      this.notesSent = notes.filter(n => n.author.par_firstname == JSON.parse(localStorage['auth_firstname'])
                                      && n.author.par_lastname == JSON.parse(localStorage['auth_lastname']));
    });
  }

  toggleFocus(id: number) {
    this.focusedNote = this.focusedNote !== id ? id : null;
  }

}
