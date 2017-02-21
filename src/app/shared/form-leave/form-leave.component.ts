import { Component, OnInit, Input, Output, ViewContainerRef, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-leave',
  templateUrl: './form-leave.component.html',
  styleUrls: ['./form-leave.component.css']
})
export class FormLeaveComponent implements OnInit {

  @Input() form: FormGroup;

  @Output() formLeave: EventEmitter<string> = new EventEmitter();

  dialogRef: MdDialogRef<FormLeaveDialogComponent>;

  constructor(public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    config.width = '500px';
    config.height = '300px';

    this.dialogRef = this.dialog.open(FormLeaveDialogComponent, config);
    this.dialogRef.componentInstance.form = this.form;

    this.dialogRef.afterClosed().subscribe(result => {
      this.formLeave.emit(result !== undefined ? result : 'return');
      this.dialogRef = null;
      return false;
    });
  }
}

@Component({
  selector: 'app-form-leave-dialog',
  styles: [``],
  template: `
    <div>
      <p *ngIf="form.valid">You have unsaved changes in your form. Do you want to save or abort them ?</p>
      <p *ngIf="!form.valid">You have unsaved changes in your form, and they made it invalid. Do you want to abort them or return to the form ?</p>
			<div><button md-button type="button" (click)="dialogRef.close('abort')">Abort</button>
			<button md-button *ngIf="!form.valid" type="button" (click)="dialogRef.close('return')">Back to the form</button>
			<button md-raised-button *ngIf="form.valid" type="button" (click)="dialogRef.close('save')" i18n>Save</button></div>
    </div>
  `
})
export class FormLeaveDialogComponent implements OnInit {

  public form: FormGroup;
  
  constructor(public dialogRef: MdDialogRef<FormLeaveDialogComponent>) { }

  ngOnInit() { }
}