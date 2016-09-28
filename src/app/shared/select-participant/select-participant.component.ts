import { Component, OnInit, forwardRef } from '@angular/core';
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

  public partList: Observable<DbParticipant[]>;

  private value: string;
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
    this.value = v;
    this.propagateChange(v);
  }
}
