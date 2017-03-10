import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { DossiersService } from '../../services/backend/dossiers.service';
import { NoteService } from '../../services/backend/note.service';
import { NoteJson } from '../../services/backend/db-models/json';

@Component({
  selector: 'app-note-forward',
  templateUrl: './note-forward.component.html',
  styleUrls: ['./note-forward.component.css']
})
export class NoteForwardComponent {

  note: NoteJson;

  constructor(public dialogRef: MdDialogRef<NoteForwardComponent>) { }

  formAction(action) {
    this.dialogRef.close(action);
  }
}

@Component({
  selector: 'app-note-forward-form',
  templateUrl: './note-forward-form.component.html',
  styleUrls: ['./note-forward.component.css']
})
export class NoteForwardFormComponent implements OnInit {

  @Input() note: NoteJson;

  @Output() formAction = new EventEmitter<string>();

  form: FormGroup;
  rcptInfoCtrl: FormControl;
  rcptActCtrl: FormControl;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(public router: Router, private fb: FormBuilder, public service: NoteService) { }

  ngOnInit() {
    this.rcptActCtrl = new FormControl(this.note.recipients_action ? this.note.recipients_action.map(r => r.par_id) : []);
    this.rcptInfoCtrl = new FormControl(this.note.recipients_info ? this.note.recipients_info.map(r => r.par_id) : []);

    this.form = this.fb.group({
      rcptAct: this.rcptActCtrl,
      rcptInfo: this.rcptInfoCtrl
    });
  }

  onSubmit() {
    this.service.updateNote(this.note.not_id, this.rcptInfoCtrl.value, this.rcptActCtrl.value)
      .subscribe(ret => {
        this.formAction.emit('success');
      },(err) => {
        this.errorMsg = 'Error while forwarding the note';
        this.errorDetails = err.text();
      });
  }

  doCancel() {
    this.formAction.emit('cancel');
  }
}