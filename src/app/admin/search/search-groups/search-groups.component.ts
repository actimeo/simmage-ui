import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-search-groups',
  templateUrl: './search-groups.component.html',
  styleUrls: ['./search-groups.component.css']
})
export class SearchGroupsComponent implements OnInit, OnDestroy {
  @Input() elements: any[];
  @Input() placeholderString: string;
  @Input() selectString: string;
  @Output() returnElements = new EventEmitter<number[]>();

  private elementsShown: any[] = [];
  private elementsTemp: any[] = [];
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
    this.returnElements.emit(this.elementsToSend);
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
