import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-ng2/main';

@Component({
  template: `
    <span style="text-align: center">
      <input type="checkbox" (change)="onChange($event)" [checked]="checked">
    </span>
    `
})
export class CheckboxRendererComponent implements AgRendererComponent {

  private params: any;
  public checked;
  private onChangeCallback;

  constructor() { }

  agInit(params: any): void {
    this.checked = params.value;
    this.params = params;
    this.onChangeCallback = this.params.colDef.onChange;
  }

  onChange(ev) {
    if (this.onChangeCallback) {
      this.onChangeCallback(ev, this.params);
    }

/*    this.update.add(
      this.params.data[this.params.colDef.key],
      ev.checked,
      this.params.colDef.data ? this.params.colDef.data.id : null);
      */
  }
}
