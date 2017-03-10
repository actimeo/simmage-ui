import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { NoteForwardComponent } from '../../shared/note-forward/note-forward.component';

@Injectable()
export class FormsDialogService {

  constructor(private dialog: MdDialog) { }

  public openForm(note: any): Observable<string> {

    let dialogRef: MdDialogRef<NoteForwardComponent>;

    dialogRef = this.dialog.open(NoteForwardComponent);
    dialogRef.componentInstance.note = note;

    return dialogRef.afterClosed();
  }

}
