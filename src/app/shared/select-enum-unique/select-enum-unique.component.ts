import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { EnumsService } from '../../services/backend/enums.service';

@Component({
  selector: 'app-select-enum-unique',
  templateUrl: './select-enum-unique.component.html',
  styleUrls: ['./select-enum-unique.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectEnumUniqueComponent),
      multi: true
    }
  ]

})
export class SelectEnumUniqueComponent implements OnInit, ControlValueAccessor {
  @Input() dbenum;
  @Input() default: string = null;

  private value: string;
  public values: Observable<string[]>;

  private propagateChange = (_: any) => { };

  constructor(private enums: EnumsService) { }

  ngOnInit() {
    this.values = this.enums.enum_list(this.dbenum);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  onSelectChange(v) {
    this.value = v;
    this.propagateChange(v);
  }
}
