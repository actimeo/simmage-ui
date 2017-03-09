import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { DossiersService } from '../../services/backend/dossiers.service';
import { DbDossier, DbGroup, DbDossierOrganizationStatus } from '../../services/backend/db-models/organ';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-select-dossier-unique',
  templateUrl: './select-dossier-unique.component.html',
  styleUrls: ['./select-dossier-unique.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDossierUniqueComponent),
      multi: true
    }
  ]
})
export class SelectDossierUniqueComponent implements OnInit, ControlValueAccessor {

  @Input() multiple: boolean;
  public dosList: any[];
  
  public elementsShown: any[] = [];      // Content of select element
  filterSubscribe: Subscription;
  filtered: boolean = false;
  
  elementInputCtrl: FormControl;
  
  private value: number[];
  private propagateChange = (_: any) => { };

  constructor(public dossiersService: DossiersService) { }

  ngOnInit() {
    this.dossiersService.loadDossiers(false, false, null, true).subscribe(
      d=> this.dosList = d
    );
    this.elementInputCtrl = new FormControl('');
    this.filterSubscribe = this.elementInputCtrl.valueChanges.debounceTime(300)
      .subscribe(e => this.filterElementsShown(e));
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
  private filterElementsShown(value: string) {
    if (value.length < 3) {
      this.elementsShown = this.dosList;
      this.filtered = false;
      return;
    }
    this.filtered = true;
    let reg = new RegExp(value, 'i');
    this.elementsShown = this.dosList.filter(e => e.name.match(reg));
  }

  emptyInputSearch(ev) {
    ev.stopPropagation();
    this.elementInputCtrl.setValue('');
  }
  /*
  addElement(event) {
    event.preventDefault();

    this.dosList.forEach(e => {
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
  }*/
}
