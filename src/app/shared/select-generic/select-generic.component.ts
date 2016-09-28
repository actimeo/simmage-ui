import { Component, OnInit, OnDestroy, Input, forwardRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

@Component({
  selector: 'app-search-elements',
  templateUrl: './search-elements.component.html',
  styleUrls: ['./search-elements.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchElementsComponent),
    multi: true
  }]
})
export class SearchElementsComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() elements: any;
  @Input() placeholderString: string;
  @Input() selectString: string;

  private elementsShown: any[] = [];            // Content of select element
  private elementsTemp: any[] = [];             // List shown under the input
  private elementsToSend: number[] = [];

  elementSubscribe: Subscription;
  elementAutocomplete: boolean = false;

  elementSelector: FormGroup;
  elementsCtrl: FormControl;
  elementInputCtrl: FormControl;

  errorMsg: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.elementInputCtrl = new FormControl('');
    this.elementsCtrl = new FormControl('');

    this.elementSelector = this.fb.group({
      elementInput: this.elementInputCtrl,
      elements: this.elementsCtrl
    });

    this.elementsShown = this.elements;

    this.elementSubscribe = this.elementInputCtrl.valueChanges.debounceTime(300).subscribe(e => this.searchElement(e));
  }

  writeValue(val) {
    this.elementsToSend = [];
    this.elementsTemp = [];
    this.elementsToSend = val;
    this.elements.forEach(e => {
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
    this.elementSubscribe.unsubscribe();
  }

  addElement(event) {
    event.preventDefault();
    this.errorMsg = '';
    this.elements.forEach(e => {
      if (e.id === +this.elementsCtrl.value) {
        if (this.elementsTemp.indexOf(e) === -1) {
          this.elementsToSend.push(e.id);
          this.elementsTemp.push(e);
          this.sendElements();
        } else {
          this.errorMsg = 'This element is already inside the list';
        }
        return;
      }
    });
  }

  removeElement(index) {
    this.errorMsg = '';
    this.elementsToSend.splice(index, 1);
    this.elementsTemp.splice(index, 1);
    this.sendElements();
  }

  private sendElements() {
    this.propagateChange(this.elementsToSend)
  }

  private searchElement(value: string) {
    if (value.length < 3) {
      this.elementsShown = this.elements;
      this.elementAutocomplete = false;
      return;
    }
    this.elementAutocomplete = true;
    this.elementsShown = [];

    this.elements.forEach(e => {
      let name: string = e.name;
      if (name.match(new RegExp(value, 'i'))) {
        this.elementsShown.push(e);
      }
    });
  }
}
