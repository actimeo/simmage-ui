import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherizedModuleName %>.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>.component.<%= styleExt %>'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => <%= classifiedModuleName %>Component),
      multi: true
    }
  ]

})
export class <%= classifiedModuleName %>Component implements OnInit, ControlValueAccessor {

  /**
    * TODO
    * call this.propagateChange(v) with the new value when the value of the control changes
    */

  private propagateChange = (_: any) => { };

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: any) {
    // TODO write value in attribute
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

}
