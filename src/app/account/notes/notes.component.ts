import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { NotesService } from '../../services/backend/notes.service';
import { FormsDialogService } from './../../services/utils/forms-dialog.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NoteJson } from '../../services/backend/db-models/json';

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
  private userFName: string;
  private userLName: string;

  private selectedTab: number;

  orderByEvent = false;
  orderByDescending = true;

  notesReceivedInfo: NoteJson[];
  notesReceivedAction: NoteJson[];
  notesSent: NoteJson[];

  constructor(private service: NotesService, private dialog: FormsDialogService) { }

  ngOnInit() {
    this.userFName = JSON.parse(localStorage['auth_firstname']);
    this.userLName = JSON.parse(localStorage['auth_lastname']);
    this.loadNotes();
  }

  loadNotes() {
    this.notesReceivedInfo = [];
    this.notesReceivedAction = [];
    this.notesSent = [];
    this.service.loadNotesForUser(this.orderByEvent, this.orderByDescending).subscribe(notes => {

      this.notesReceivedInfo = notes.filter(n => n.recipients_info ? n.recipients_info.filter(r => r.par_firstname === this.userFName
                                                                    && r.par_lastname === this.userLName
                                                                    && r.nor_for_action === false).length > 0 : false);

      this.notesReceivedAction = notes.filter(n => n.recipients_action ? n.recipients_action.filter(r => r.par_firstname === this.userFName
                                                                    && r.par_lastname === this.userLName
                                                                    && r.nor_for_action === true).length > 0 : false);

      this.notesSent = notes.filter(n => n.author.par_firstname === this.userFName
                                      && n.author.par_lastname === this.userLName);
    });
  }

  toggleFocus(id: number) {
    this.focusedNote = this.focusedNote !== id ? id : null;
  }

  toggleOrderField(order) {
    this.orderByEvent = order === 'event' ? true : false;
    this.loadNotes();
  }

  toggleOrdering(desc) {
    this.orderByDescending = desc === 'desc' ? true : false;
    this.loadNotes();
  }

  isCurrentUser(fName, lName) {
    return fName === this.userFName && lName === this.userLName;
  }

  acknowledgeReceipt(event, note) {
    event.stopPropagation();
    this.service.acknowledgeNoteReceipt(note).subscribe(_ => this.loadNotes());
  }

  forwardNote(event, note) {
    event.stopPropagation();
    this.dialog.openNoteForwarding(note).subscribe(s => { if (s === 'success') { this.loadNotes(); } });
  }

  openNoteForm() {
    this.dialog.openNoteForm({ }).subscribe(note => {
      this.loadNotes();
      this.selectedTab = 2;
      this.toggleFocus(note);
    });
  }
}
