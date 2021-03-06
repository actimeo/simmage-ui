import { Component, OnInit, OnDestroy, Input, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import '../../rxjs_operators';

import { GridOptions } from 'ag-grid/main';
import { CheckboxRendererComponent } from '../../grid/renderers/checkbox';
import { EnumsService } from '../../services/backend/enums.service';

@Component({
  selector: 'app-generic-rights',
  templateUrl: './generic-rights.component.html',
  styleUrls: ['./generic-rights.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GenericRightsComponent),
    multi: true
  }]
})
export class GenericRightsComponent implements OnInit, OnDestroy, ControlValueAccessor {

  _elements: any = [];
  @Input() set elements(elements) {
    this._elements = elements;
    this.writeValue(this.elementsToSend);
  }
  @Input() placeholderString: string;
  @Input() selectString: string;

  private rights: any[];
  public showGrid = false;

  public topicRights: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private elementsToSend: any[] = [];  // value returned by form control

  public elementsShown: any[] = [];      // Content of select element
  public elementsTemp: any[] = [];       // List shown under the input

  filterSubscribe: Subscription;
  filtered = false;

  elementsCtrl: FormControl;
  elementInputCtrl: FormControl;

  // ag-grid
  public gridHeight = 400;
  public headerHeight = 48;
  public rowHeight = 48;
  public columnDefs = [];
  public rowData = [];
  public gridOptions: GridOptions = <GridOptions>{
    defaultColDef: {
      suppressMovable: true
    }
  };

  constructor(private es: EnumsService) { }

  ngOnInit() {
    this.elementInputCtrl = new FormControl('');
    this.elementsCtrl = new FormControl('');

    this.elementsShown = this._elements;

    this.rights = [];

    this.filterSubscribe = this.elementInputCtrl.valueChanges.debounceTime(300)
      .subscribe(e => this.filterElementsShown(e));

    this.es.enum_list('login/usergroup_topic_right').subscribe(data => this.topicRights.next(data));
    this.initGrid();
  }

  writeValue(val: any[]) {
    if (val === null) {
      val = [];
    }

    this.elementsToSend = val;
    this.elementsTemp = this._elements.filter(e => val.map(t => t.id).indexOf(e.id) > -1);
    this.initGrid();
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
          const i = this.elementsToSend.length;
          this.elementsToSend.push({ id: e.id, rights: [] });
          this.elementsTemp.push(e);
          this.columnDefs.push({
            headerName: '<img width="24" src="assets/icons/topics/' + e.icon + '.png">',
            headerTooltip: e.name,
            width: 48,
            cellStyle: { textAlign: 'center' },
            valueGetter: params => params.data.topics.indexOf(e.id) > -1,
            cellRendererFramework: CheckboxRendererComponent,
            onChange: (ev, params) => {
              let newTopicssIds = params.data.topics.slice(0);
              if (ev.target.checked) {
                if (newTopicssIds.indexOf(e.id) === -1) {
                  newTopicssIds.push(e.id);
                  this.elementsToSend[i].rights.push(params.data.right);
                }
              } else {
                if (newTopicssIds.indexOf(e.id) > -1) {
                  newTopicssIds = newTopicssIds.filter(oid => oid !== e.id);
                  this.elementsToSend[i].rights = this.elementsToSend[i].rights.filter(r => r !== params.data.right);
                }
              }
              params.data.topics = newTopicssIds.slice(0);
              this.sendElements();
            }
          });
          this.columnDefs = this.columnDefs.slice(0);
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
    this.initGrid();
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
    const reg = new RegExp(value, 'i');
    this.elementsShown = this._elements.filter(e => e.name.match(reg));
    this.elementsCtrl.setValue('');
  }

  emptyInputSearch(ev) {
    ev.stopPropagation();
    this.elementInputCtrl.setValue('');
  }

  initGrid() {
    this.createRowData();
  }

  createColumnDefs() {
    this.columnDefs = [];

    this.columnDefs.push({
      headerName: 'Rights',
      field: 'right',
      width: 150,
      pinned: 'left'
    });

    this.elementsTemp.forEach((e, i) => this.columnDefs.push({
      headerName: '<img width="24" src="assets/icons/topics/' + e.icon + '.png">',
      headerTooltip: e.name,
      width: 48,
      cellStyle: { textAlign: 'center' },
      valueGetter: params => params.data.topics.indexOf(e.id) > -1,
      cellRendererFramework: CheckboxRendererComponent,
      onChange: (event, params) => {
        let newTopicssIds = params.data.topics.slice(0);
        if (event.target.checked) {
          if (newTopicssIds.indexOf(e.id) === -1) {
            newTopicssIds.push(e.id);
            this.elementsToSend[i].rights.push(params.data.right);
          }
        } else {
          if (newTopicssIds.indexOf(e.id) > -1) {
            newTopicssIds = newTopicssIds.filter(oid => oid !== e.id);
            this.elementsToSend[i].rights = this.elementsToSend[i].rights.filter(r => r !== params.data.right);
          }
        }
        params.data.topics = newTopicssIds.slice(0);
        this.sendElements();
      }
    }));
  }

  createRowData() {
    this.topicRights.subscribe(data => {
      if (!data) {
        return;
      }
      this.createColumnDefs();

      this.rights = [];
      data.forEach(r => {
        const right = { right: r, topics: [] };
        this.elementsToSend.forEach(e => {
          if (e.rights.indexOf(r) > -1) {
            right.topics.push(e.id);
          }
        });
        this.rights.push(right);
      });

      this.gridHeight = (2 + this.rowHeight) * (this.rights.length + 1);
      this.rowData = this.rights.map(r => ({
        right: r.right,
        topics: r.topics ? r.topics : []
      }));

      this.showGrid = true;
    });
  }

  disableSelectElement(id) {
    return this.elementsToSend.map(ets => ets.id).indexOf(id) !== -1 ? true : false;
  }
}
