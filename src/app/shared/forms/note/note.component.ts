import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { NotesService } from '../../../services/backend/notes.service';
import { NoteService } from '../../../services/backend/note.service';
import { DossiersService } from '../../../services/backend/dossiers.service';

import { DbMainmenu } from '../../../services/backend/db-models/portal';
import { DbNote } from '../../../services/backend/db-models/notes';
import { NoteJson } from '../../../services/backend/db-models/json';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, AfterViewInit {

  @ViewChild('getfocus') getfocus: ElementRef;

  id: number;
  contentId: number;

  form: FormGroup;
  objectCtrl: FormControl;
  noteTypeCtrl: FormControl;
  contentCtrl: FormControl;

  eventDateCtrl: FormControl;
  topicsCtrl: FormControl;
  dossierCtrl: FormControl;
  rcptInfoCtrl: FormControl;
  rcptActCtrl: FormControl;

  viewTopics: any[] = [];
  dossiersList: any[] = [];

  originalData: any = null;
  pleaseSave = false;

  errorMsg = '';
  errorDetails = '';

  static noteDossiersValidator(group: FormGroup) {
    let check = null;
    if (group.value.noteType === 'dossier') {
      if (group.value.topics.length === 0 || group.value.dossiers.length === 0) {
        check = { mustContainValue: true };
      }
    }
    return check;
  }

  static noteHasRecipient(group: FormGroup) {
    let check = null;
    if (group.value.noteType === 'other') {
      if (group.value.rcptInfo.length === 0 && group.value.rcptAct.length === 0) {
        check = { mustSelectRecipient: true };
      }
    }
    return check;
  }

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public notesService: NotesService,
    public service: NoteService, public dossiersService: DossiersService, public dialogRef: MdDialogRef<NoteComponent>) { }

  ngOnInit() {
    this.errorMsg = '';
    this.errorDetails = '';
    this.pleaseSave = false;

    this.originalData = null;
    this.createForm(null);

    if(this.id) {
      this.service.getNote(this.id).subscribe(note => {
        const not = note ? note[0] : null;
        this.originalData = not;
        if (this.form) {
          this.updateForm(not);
        } else {
          this.createForm(not);
        }
      });
    }

    this.notesService.loadViewTopics(this.contentId).subscribe(tops => {
      this.viewTopics = tops.map(t => ({ id: t.top_id, name: t.top_name }));
    });

    this.dossiersService.loadDossiers(false, false, null, true)
      .subscribe(dossiers => this.dossiersList = dossiers.map(d => ({ id: d.dos_id, name: d.dos_lastname + ' ' + d.dos_firstname })));
  }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
  }

  private createForm(data: NoteJson) {
    this.objectCtrl = new FormControl(data ? data.not_object : '');
    this.noteTypeCtrl = new FormControl(data ? data.topics ? 'dossier' : 'other' : 'dossier', Validators.required);
    this.contentCtrl = new FormControl(data ? data.not_text : '', Validators.required);
    this.eventDateCtrl = new FormControl(data ? data.not_event_date : '');
    this.rcptInfoCtrl = new FormControl(data && data.recipients
              ? data.recipients.filter(r => r.nor_for_action === false).map(r => r.par_id) : []);
    this.rcptActCtrl = new FormControl(data && data.recipients
              ? data.recipients.filter(r => r.nor_for_action === true).map(r => r.par_id) : []);
    this.topicsCtrl = new FormControl(data && data.topics ? data.topics.map(t => t.top_id) : []);
    this.dossierCtrl = new FormControl(data && data.dossiers ? data.dossiers.map(d => d.dos_id) : []);

    this.form = this.fb.group({
      object: this.objectCtrl,
      noteType: this.noteTypeCtrl,
      content: this.contentCtrl,
      eventDate: this.eventDateCtrl,
      rcptInfo: this.rcptInfoCtrl,
      rcptAct: this.rcptActCtrl,
      topics: this.topicsCtrl,
      dossiers: this.dossierCtrl
    }, {
      validator: Validators.compose([NoteComponent.noteDossiersValidator, NoteComponent.noteHasRecipient])
    });
  }

  private updateForm(data: NoteJson) {
    this.objectCtrl.setValue(data ? data.not_object : '');
    this.noteTypeCtrl.setValue(data ? data.topics ? 'dossier' : 'other' : 'dossier');
    this.contentCtrl.setValue(data ? data.not_text : '');
    this.eventDateCtrl.setValue(data ? data.not_event_date : '');
    this.rcptInfoCtrl.setValue(data && data.recipients
      ? data.recipients.filter(r => r.nor_for_action === false).map(r => r.par_id) : []);
    this.rcptActCtrl.setValue(data && data.recipients ? data.recipients.filter(r => r.nor_for_action === true).map(r => r.par_id) : []);
    this.topicsCtrl.setValue(data && data.topics.map(t => t.top_id));
    this.dossierCtrl.setValue(data && data.dossiers.map(d => d.dos_id));
  }

  onSubmit() {
    this.service.addNote(
      this.contentCtrl.value, this.eventDateCtrl.value, this.objectCtrl.value, this.topicsCtrl.value,
      this.dossierCtrl.value, this.rcptInfoCtrl.value, this.rcptActCtrl.value
    ).subscribe(ret => {
      this.id = ret;
      this.closeForm(ret)
    },
    (err) => {
      this.errorMsg = 'Error while adding a note';
      this.errorDetails = err.text();
    });
  }

  doCancel() {
    this.closeForm();
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doDelete() {
    this.service.deleteNote(this.id).subscribe(ret => {
      this.closeForm(-1);
    },
      (err) => {
        this.errorMsg = 'Error while deleting the note';
        this.errorDetails = err.text();
      });
  }

  closeForm(id = null) {
    if (this.form) {
      this.form.reset();
    }

    this.dialogRef.close(id);
  }

  isNoteDossier() {
    if (this.noteTypeCtrl.value === 'dossier') {
      return true;
    } else {
      return false;
    }
  }

  removeTopDos() {
    if (this.noteTypeCtrl.value === 'other') {
      this.topicsCtrl.setValue(this.originalData ? this.originalData.topics.map(t => t.top_id) : []);
      this.dossierCtrl.setValue(this.originalData ? this.originalData.dossiers.map(d => d.dos_id) : []);
      this.eventDateCtrl.setValue(this.originalData ? this.originalData.not_event_date : '');
    }
  }
}
