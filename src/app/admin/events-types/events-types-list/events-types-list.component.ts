import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdCheckbox } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { GridOptions } from 'ag-grid/main';

import { PreferencesService } from '../../../shared/preferences.service';
import { EnumsService } from '../../../shared/enums.service';
import { EventsTypesListData } from '../events-types-list-resolve.guard';
import { EventsTypesService } from '../events-types.service';
import { EventsTypesListResolve } from '../events-types-list-resolve.guard';

import { CheckboxRendererComponent } from '../../../grid/renderers/checkbox';

@Component({
  selector: 'app-events-types-list',
  templateUrl: './events-types-list.component.html',
  styleUrls: ['./events-types-list.component.css']
})
export class EventsTypesListComponent implements OnInit {

  isTabular: boolean = false;
  public categories: Observable<string[]>;
  public selectedId: Observable<number>;
  public lastSelectedCat: string;
  public selectedCat: Observable<string>;
  public eventsTypesData: BehaviorSubject<EventsTypesListData> = new BehaviorSubject<EventsTypesListData>(null);

  /* ag-grid */
  public gridHeight: number = 400;
  public headerHeight = 48;
  public rowHeight = 64;
  public columnDefs = [];
  public rowData = [];
  public gridOptions: GridOptions = <GridOptions>{};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enums: EnumsService,
    private prefs: PreferencesService,
    private service: EventsTypesService,
    private resolver: EventsTypesListResolve) { }

  ngOnInit() {
    this.isTabular = this.prefs.getPrefBoolean('events-types', 'tabular');
    this.categories = this.enums.enum_list('events/event_category');
    this.selectedId = this.route.params.pluck<number>('selid');
    this.selectedCat = this.route.params.pluck<string>('cat').map(c => this.lastSelectedCat = c);
    this.route.data.pluck<EventsTypesListData>('list').subscribe(data => this.eventsTypesData.next(data));
    this.initGrid();
  }

  setTabular(checked) {
    this.isTabular = checked;
    this.prefs.setPrefBoolean('events-types', 'tabular', this.isTabular);
    this.initGrid();
  }

  /* 
   * ag-grid 
   */
  initGrid() {
    if (!this.isTabular) {
      return;
    }
    this.createColumnDefs();
    this.createRowData();
  }

  createColumnDefs() {
    this.eventsTypesData.subscribe(data => {
      if (!data) {
        return;
      }
      this.columnDefs = [
        {
          headerName: 'Ind',
          field: 'individual',
          pinned: 'left',
          width: 64,
          cellStyle: { textAlign: 'center' },
          cellRendererFramework: {
            component: CheckboxRendererComponent,
            dependencies: [MdCheckbox]
          },
          /* app */
          onChange: (event, params) => {
            this.service.updateEventsTypes(params.data.id, params.data.name, params.data.category,
              event.checked, params.data.top_ids, params.data.org_ids)
              .subscribe(_ => this.reloadData());
          }
        },
        {
          headerName: 'Event type',
          field: 'name',
          pinned: 'left',
          editable: true,
          onCellValueChanged: event => {
            this.service.updateEventsTypes(event.data.id, event.newValue, event.data.category,
              event.data.individual, event.data.top_ids, event.data.org_ids)
              .subscribe(_ => this.reloadData());
          }
        }
      ];
      data.organs.forEach(o => this.columnDefs.push({
        headerName: o.org_name,
        width: 80,
        cellStyle: { textAlign: 'center' },
        valueGetter: params => params.data.org_ids.indexOf(o.org_id) > -1,
        cellRendererFramework: {
          component: CheckboxRendererComponent,
          dependencies: [MdCheckbox]
        },
        /* app */
        onChange: (event, params) => {
          let newOrgIds = params.data.org_ids.slice(0);
          if (event.checked) {
            if (newOrgIds.indexOf(o.org_id) === -1) {
              newOrgIds.push(o.org_id);
            }
          } else {
            if (newOrgIds.indexOf(o.org_id) > -1) {
              newOrgIds = newOrgIds.filter(oid => oid !== o.org_id);
            }
          }
          this.service.updateEventsTypes(params.data.id, params.data.name, params.data.category,
            params.data.individual, params.data.top_ids, newOrgIds)
            .subscribe(_ => this.reloadData());
        }

      }));
      data.topics.forEach(t => this.columnDefs.push({
        headerName: '<img md-tooltip="' + t.top_name + '" width="24" src="/assets/icons/topics/' + t.top_icon + '.png">',
        width: 64,
        cellStyle: { textAlign: 'center' },
        valueGetter: params => params.data.top_ids.indexOf(t.top_id) > -1,
        cellRendererFramework: {
          component: CheckboxRendererComponent,
          dependencies: [MdCheckbox]
        },
        /* app */
        onChange: (event, params) => {
          let newTopIds = params.data.top_ids.slice(0);
          if (event.checked) {
            if (newTopIds.indexOf(t.top_id) === -1) {
              newTopIds.push(t.top_id);
            }
          } else {
            if (newTopIds.indexOf(t.top_id) > -1) {
              newTopIds = newTopIds.filter(oid => oid !== t.top_id);
            }
          }
          this.service.updateEventsTypes(params.data.id, params.data.name, params.data.category,
            params.data.individual, newTopIds, params.data.org_ids)
            .subscribe(_ => this.reloadData());
        }
      }));
    });
  }

  createRowData() {
    this.eventsTypesData.subscribe(data => {
      if (!data) {
        return;
      }
      const etys = data.eventsTypes;
      this.gridHeight = this.rowHeight * (2 + etys.length);
      this.rowData = etys.map(ety => ({
        id: ety.eventType.ety_id,
        individual: ety.eventType.ety_individual_name,
        category: ety.eventType.ety_category,
        name: ety.eventType.ety_name,
        top_ids: ety.eventType.top_ids,
        org_ids: ety.eventType.org_ids
      }));
    });
  }

  private reloadData() {
    this.resolver.getData(this.lastSelectedCat).subscribe(
      data => this.eventsTypesData.next(data as any)
    );
  }
}
