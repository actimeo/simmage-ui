import { Component } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-leave',
  templateUrl: './form-leave.component.html',
  styleUrls: ['./form-leave.component.css']
})
export class FormLeaveComponent {

  public form: FormGroup;
  public nextUrl: string;

  constructor(public dialogRef: MdDialogRef<FormLeaveComponent>) { }

}
