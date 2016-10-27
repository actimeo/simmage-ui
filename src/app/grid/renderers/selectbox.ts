import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl } from '@angular/forms';
import { AgRendererComponent, AgEditorComponent } from 'ag-grid-ng2/main';

@Component({
  template: `
      <div class="ag-cell-edit-input">
        <select #selector class="ag-cell-edit-input">
          <option *ngFor="let opt of optionNodes" value="{{opt.value}}" [selected]="isDefaultValue(opt.value)">{{opt.textNode}}</option>
        </select>
      </div>
    `
})
export class SelectboxRendererComponent implements AgEditorComponent {

  private params: any;
  private optionNodes: any;
  private defVal: any;

  @ViewChild('selector') selector;

  constructor() { }

  agInit(params: any): void {
    this.defVal = params.value;
    this.params = params;
    this.optionNodes = params.options.values;
  }

  isDefaultValue(val) {
    return this.defVal == val;
  }

  getValue(): any {
    return this.selector.nativeElement.value;
  }
}
