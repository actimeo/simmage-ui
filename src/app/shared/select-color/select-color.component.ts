import { Component, OnInit, forwardRef, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.css'],
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectColorComponent),
      multi: true
    }
  ]
})
export class SelectColorComponent implements OnInit, ControlValueAccessor {

  dialogRef: MdDialogRef<ColorDialogComponent>;

  public value;
  private propagateChange = (_: any) => { };

  constructor(public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  open() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(ColorDialogComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.value = result;
        this.propagateChange(this.value);
        this.dialogRef = null;
      }
    });
  }

}

@Component({
  selector: 'app-color-dialog',
  styles: [`.color-block { width: 50px; height: 25px; border: 1px solid black; cursor: pointer; display: inline-block; }`],
  template: `
  <div *ngFor="let color of colors | async" 
      class="color-block" 
      [style.background-color]="color" 
      (click)="dialogRef.close(color)">
  </div>`
})
export class ColorDialogComponent implements OnInit {

  public colors: Observable<string[]>;

  constructor(public dialogRef: MdDialogRef<ColorDialogComponent>) { }

  ngOnInit() {
    this.colors = Observable.of([
      '#F44336',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00BCD4',
      '#009688',
      '#4CAF50',
      '#8BC34A',
      '#CDDC39',
      '#FFEB38',
      '#FFC107',
      '#FF9800',
      '#FF5722',
      '#795548',
      '#9E9E9E',
      '#607D8B',
      '#FFFFFF'
    ]);
  }
}
