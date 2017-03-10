import { Component, AfterViewInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { DbParticipant } from '../../services/backend/db-models/organ';
import { ParticipantsService } from '../../services/backend/participants.service';

@Component({
  selector: 'app-select-participant',
  templateUrl: './select-participant.component.html',
  styleUrls: ['./select-participant.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectParticipantComponent),
      multi: true
    }
  ]
})
export class SelectParticipantComponent implements AfterViewInit, ControlValueAccessor {

  @Input() multiple: boolean;
  @Input() filterOut: boolean = false;
  public partList: Observable<DbParticipant[]>;

  private value: number[];
  private initValue: number[];
  private propagateChange = (_: any) => { };

  constructor(private participants: ParticipantsService) { }

  ngAfterViewInit() {
    this.partList = this.participants.list().map(data => this.filterOut && this.multiple ? data.filter(p => this.value.indexOf(p.par_id) == -1) : data);
    this.initValue = this.value.slice(0);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  onSelectChange(v) {
    this.value = Array.apply(null, v).filter(opt => opt.selected).map(opt => +opt.value);
    if (!this.multiple) {
      this.propagateChange(this.value[0]);
    } else {
      this.propagateChange(this.initValue && this.filterOut ? this.value.concat(this.initValue) : this.value);
    }
  }

  isSelected(id) {
    if (this.value != null) {
      if (!this.multiple) {
        return id === this.value ? true : false;
      } else {
        return this.value.indexOf(id) !== -1 ? true : false;
      }
    }
  }
}
