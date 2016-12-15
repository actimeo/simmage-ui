import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { EnumsService } from '../enums.service';

@Component({
  selector: 'app-select-enum-multiple',
  templateUrl: './select-enum-multiple.component.html',
  styleUrls: ['./select-enum-multiple.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectEnumMultipleComponent),
      multi: true
    }
  ]

})
export class SelectEnumMultipleComponent implements OnInit, ControlValueAccessor {

  @Input() dbenum;
  private value: string[] = [];
  public valuesList: Observable<string[]>;

  private propagateChange = (_: any) => { };

  constructor(private enums: EnumsService) { }

  ngOnInit() {
    this.valuesList = this.enums.enum_list(this.dbenum);
  }

  writeValue(value: any) {
    this.value = value !== null ? value : [];
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  onCheckboxChange(ev) {
    this.value = this.value.filter(t => t !== ev.target.value);
    if (ev.target.checked) {
      this.value.push(ev.target.value);
    }
    this.propagateChange(this.value);
  }
}
