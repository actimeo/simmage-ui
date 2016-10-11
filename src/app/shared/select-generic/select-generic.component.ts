import { Component, OnInit, OnDestroy, Input, forwardRef } from '@angular/core';
import { FormControl, FormBuilder, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import '../../rxjs_operators';

@Component({
  selector: 'app-select-generic',
  templateUrl: './select-generic.component.html',
  styleUrls: ['./select-generic.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectGenericComponent),
    multi: true
  }]
})
export class SelectGenericComponent implements OnInit, OnDestroy, ControlValueAccessor {
  _elements: any = [];
  @Input() set elements(elements) {
    this._elements = elements;
    this.writeValue(this.elementsToSend);
  }
  @Input() placeholderString: string;
  @Input() selectString: string;

  private elementsShown: any[] = [];            // Content of select element
  private elementsTemp: any[] = [];             // List shown under the input
  private elementsToSend: number[] = [];

  elementSubscribe: Subscription;
  elementAutocomplete: boolean = false;

  elementsCtrl: FormControl;
  elementInputCtrl: FormControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.elementInputCtrl = new FormControl('');
    this.elementsCtrl = new FormControl('');

    this.elementsShown = this._elements;

    this.elementSubscribe = this.elementInputCtrl.valueChanges.debounceTime(300).subscribe(e => this.searchElement(e));
  }

  writeValue(val) {
    if (val === null) {
      val = [];
    }
    this.elementsToSend = [];
    this.elementsTemp = [];
    this.elementsToSend = val;
    this._elements.forEach(e => {
      val.forEach(id => {
        if (e.id === id) {
          this.elementsTemp.push(e);
        }
      });
    });
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) { }

  ngOnDestroy() {
    if (this.elementSubscribe) {
      this.elementSubscribe.unsubscribe();
    }
  }

  addElement(event) {
    event.preventDefault();

    this._elements.forEach(e => {
      if (e.id === +this.elementsCtrl.value) {
        if (this.elementsTemp.indexOf(e) === -1) {
          this.elementsToSend.push(e.id);
          this.elementsTemp.push(e);
          this.sendElements();
        }
        return;
      }
    });
    this.elementsCtrl.setValue('');
  }

  removeElement(index) {
    this.elementsToSend.splice(index, 1);
    this.elementsTemp.splice(index, 1);
    this.sendElements();
  }

  private sendElements() {
    this.propagateChange(this.elementsToSend);
  }

  private searchElement(value: string) {
    if (value.length < 3) {
      this.elementsShown = this._elements;
      this.elementAutocomplete = false;
      return;
    }
    this.elementAutocomplete = true;
    this.elementsShown = [];

    this._elements.forEach(e => {
      let name: string = e.name;
      if (name.match(new RegExp(value, 'i'))) {
        this.elementsShown.push(e);
      }
    });
    this.elementsCtrl.setValue('');
  }

  emptyInputSearch(ev) {
    ev.stopPropagation();
    this.elementInputCtrl.setValue('');
  }
}
