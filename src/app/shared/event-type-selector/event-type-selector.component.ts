import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';
import { EventsService } from '../../services/backend/events.service';
import { DbEventTypeList } from '../../services/backend/db-models/events';

export interface EtypeSelectorValue {
  ety: number;
  topics: number[];
  cat: string;
}

@Component({
  selector: 'app-event-type-selector',
  templateUrl: './event-type-selector.component.html',
  styleUrls: ['./event-type-selector.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EventTypeSelectorComponent),
    multi: true
  }]
})
export class EventTypeSelectorComponent implements OnInit {

  @Input() contentId: number;
  @Input() viewId: number;

  private value: EtypeSelectorValue;
  private originalData: any;

  viewTopics: any[] = [];
  eventsTypesList: Observable<DbEventTypeList[]>;

  filterSubscribe: Subscription;

  formEventType: FormGroup;
  topicsCtrl: FormControl;
  eventTypeCtrl: FormControl;

  static validatorTypeOther(group: FormGroup) {
    return (group.value == null || (+group.value.ety === 0 && group.value.topics.length > 0 || +group.value.ety > 0)) ? null : { notValid: true };
  }

  constructor(private fb: FormBuilder, private eventsService: EventsService) { }

   ngOnInit() {
    this.initForm();
  }

  initForm(data = null) {
    this.topicsCtrl = new FormControl(data ? this.setTopics(data.topics) : []);
    this.eventTypeCtrl = new FormControl(data ? data.ety : '');

    this.formEventType = this.fb.group({
      ety: this.eventTypeCtrl,
      topics: this.topicsCtrl
    });
  }

  writeValue(val: EtypeSelectorValue) {
    if (val === null) {
      val = { topics: [], ety: null, cat: '' };
    }
    
    if (this.value === undefined) {
      this.originalData = {
        topics: val.topics,
        ety: val.ety,
        cat: val.cat
      };
    }

    if (this.viewTopics.length == 0) {
      this.eventsService.loadViewTopics(this.contentId).subscribe(topics => {
        this.viewTopics = topics.map(t => ({ id: t.top_id, name: t.top_name }));
        this.setData(val);
      });
    } else {
      this.setData(val);
    }
  }

  private setData(data) {
    this.initForm(data);
    this.value = data;
    this.setWatchers();
  }

  private setTopics(topics) {
    topics = topics.filter(id => this.viewTopics.map(t => t.id).indexOf(id) > -1);
    this.setEventTypesList(topics);
    return topics;
  }

  private setWatchers() {
    this.formEventType.valueChanges.debounceTime(300).subscribe(_ => this.updateValue());
    this.formEventType.controls['topics'].valueChanges.subscribe(v => this.setEventTypesList(v));
  }

  private setEventTypesList(topics) {
    this.eventsTypesList = this.eventsService.loadEventsTypes(this.viewId, topics);
  }

  private checkCat(event) {
    this.value.cat = event.target.selectedOptions[0].parentNode.label;
    this.sendElements();
  }

  updateValue() {
    this.value.topics = this.topicsCtrl.value;
    this.value.ety = this.eventTypeCtrl.value !== '' && this.topicsCtrl.value.length > 0 ? +this.eventTypeCtrl.value : -1;
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
