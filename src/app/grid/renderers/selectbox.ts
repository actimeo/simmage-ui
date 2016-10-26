import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-ng2/main';

@Component({
  template: `
        <option value="optId">{{optName}}</option>
    `
})
export class SelectboxRendererComponent implements AgRendererComponent {

  private params: any;
  private optId;
  private optText;
  private onChangeCallback;

  constructor() { }

  agInit(params: any): void {
    console.log(params);
    this.optId = params.id;
    this.params = params;
    this.optText = params.name;
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
