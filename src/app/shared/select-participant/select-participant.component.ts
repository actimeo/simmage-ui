import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { DbParticipant } from '../../db-models/organ';
import { ParticipantsService } from '../participants.service';

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
export class SelectParticipantComponent implements OnInit, ControlValueAccessor {

  @Input() multiple: boolean;
  public partList: Observable<DbParticipant[]>;

  private value: number[];
  private propagateChange = (_: any) => { };

  constructor(private participants: ParticipantsService) { }

  ngOnInit() {
    this.partList = this.participants.list();
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
      this.propagateChange(this.value);
    }
  }

  isSelected(id) {
    if (this.value != null) {
      if (!this.multiple) {
        return id === this.value ? true : false;
      } else {
        return this.value.indexOf(id) != -1 ? true : false;
      }
    }
  }
}
