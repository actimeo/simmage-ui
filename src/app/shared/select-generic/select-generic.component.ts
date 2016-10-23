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

  private elementsToSend: number[] = [];  // value returned by form control

  private elementsShown: any[] = [];      // Content of select element
  private elementsTemp: any[] = [];       // List shown under the input

  filterSubscribe: Subscription;
  filtered: boolean = false;

  elementsCtrl: FormControl;
  elementInputCtrl: FormControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.elementInputCtrl = new FormControl('');
    this.elementsCtrl = new FormControl('');

    this.elementsShown = this._elements;

    this.filterSubscribe = this.elementInputCtrl.valueChanges.debounceTime(300)
      .subscribe(e => this.filterElementsShown(e));
  }

  writeValue(val: number[]) {
    if (val === null) {
      val = [];
    }
    this.elementsToSend = val;
    this.elementsTemp = this._elements.filter(e => val.indexOf(e.id) > -1);
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) { }

  ngOnDestroy() {
    if (this.filterSubscribe) {
      this.filterSubscribe.unsubscribe();
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

  private filterElementsShown(value: string) {
    if (value.length < 3) {
      this.elementsShown = this._elements;
      this.filtered = false;
      return;
    }
    this.filtered = true;
    let reg = new RegExp(value, 'i');
    this.elementsShown = this._elements.filter(e => e.name.match(reg));
    this.elementsCtrl.setValue('');
  }

  emptyInputSearch(ev) {
    ev.stopPropagation();
    this.elementInputCtrl.setValue('');
  }
}
