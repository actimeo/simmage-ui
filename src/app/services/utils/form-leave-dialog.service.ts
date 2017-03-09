import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormLeaveComponent } from '../../shared/form-leave/form-leave.component';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormLeaveDialogService {

  constructor(private dialog: MdDialog) { }

  public confirmFormLeaving(form: FormGroup, nextUrl: string): Observable<string> {
    let dialogRef: MdDialogRef<FormLeaveComponent>;

    dialogRef = this.dialog.open(FormLeaveComponent);
    dialogRef.componentInstance.form = form;
    dialogRef.componentInstance.nextUrl = nextUrl;

    return dialogRef.afterClosed();
  }

}
