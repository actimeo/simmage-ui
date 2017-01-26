import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';
import { DocumentsService } from '../documents.service';
import { DbDocumentTypeList } from '../../db-models/documents';

export interface DtypeSelectorValue {
  title: string;
  dty: number;
  topics: number[];
}

@Component({
  selector: 'app-document-type-selector',
  templateUrl: './document-type-selector.component.html',
  styleUrls: ['./document-type-selector.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DocumentTypeSelectorComponent),
    multi: true
  }]
})
export class DocumentTypeSelectorComponent implements OnInit, ControlValueAccessor {

  @Input() contentId: number;

  private value: DtypeSelectorValue;
  private originalData: any;

  viewTopics: any[] = [];
  documentsTypesList: Observable<DbDocumentTypeList[]>;

  filterSubscribe: Subscription;

  formDocType: FormGroup;
  titleCtrl: FormControl;
  topicsCtrl: FormControl;
  documentTypeCtrl: FormControl;

  watchersSet: boolean = false;

  constructor(private fb: FormBuilder, private documentsService: DocumentsService) { }

  ngOnInit() {
    this.initForm();
    
    this.documentsService.loadViewTopics(this.contentId).subscribe(topics => {
      this.viewTopics = topics.map(t => ({ id: t.top_id, name: t.top_name }));
      this.topicsCtrl.setValue(this.topicsCtrl.value.filter(id => topics.map(t => t.top_id).indexOf(id) > -1));
      this.setDocTypesList(this.topicsCtrl.value);
      this.setWatchers();
      this.watchersSet = true;
    });
  }

  initForm(data = null) {
    this.titleCtrl = new FormControl(data ? data.title : '');
    this.topicsCtrl = new FormControl(data ? data.topics : []);
    this.documentTypeCtrl = new FormControl(data ? data.dty : '');

    this.formDocType = this.fb.group({
      title: this.titleCtrl,
      dty: this.documentTypeCtrl,
      topics: this.topicsCtrl
    });

    if (this.watchersSet) {
      this.setWatchers();
    }
  }

  writeValue(val: DtypeSelectorValue) {
    if (val === null) {
      val = { title: null, topics: [], dty: null };
    }
    
    if (this.value === undefined) {
      this.originalData = {
        title: val.title,
        topics: val.topics,
        dty: val.dty
      };
    }
    this.initForm(val);
    this.value = val;
  }

  private setWatchers() {
    this.formDocType.valueChanges.debounceTime(300).subscribe(_ => this.updateValue());
    this.formDocType.controls['topics'].valueChanges.subscribe(v => this.setDocTypesList(v));
  }

  private setDocTypesList(topics) {
    this.documentsTypesList = this.documentsService.filterDocumentsTypes(topics);
  }

  private fillTitleInput(t) {
    if (this.titleCtrl.value == '' || !this.titleCtrl.touched && this.originalData.title == '') {
      this.titleCtrl.setValue(t.options[t.selectedIndex].text);
    }
  }

  updateValue() {
    this.value.dty = +this.documentTypeCtrl.value;
    this.value.title = this.titleCtrl.value;
    this.value.topics = this.topicsCtrl.value;
    this.sendElements();
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

  private sendElements() {
    this.propagateChange(this.value);
  }
}
