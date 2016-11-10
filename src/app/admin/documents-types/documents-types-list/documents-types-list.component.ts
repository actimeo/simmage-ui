import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { GridOptions } from 'ag-grid/main';

import { PreferencesService } from '../../../shared/preferences.service';
import { EnumsService } from '../../../shared/enums.service';
import { DocumentsTypesListData } from '../documents-types-list-resolve.guard';
import { DocumentsTypesService } from '../documents-types.service';
import { DocumentsTypesListResolve } from '../documents-types-list-resolve.guard';

import { CheckboxRendererComponent } from '../../../grid/renderers/checkbox';

@Component({
  selector: 'app-documents-types-list',
  templateUrl: './documents-types-list.component.html',
  styleUrls: ['./documents-types-list.component.css']
})
export class DocumentsTypesListComponent implements OnInit {

  isTabular: boolean = false;
  public selectedId: Observable<number>;
  public documentsTypesData: BehaviorSubject<DocumentsTypesListData> = new BehaviorSubject<DocumentsTypesListData>(null);

  /* ag-grid */
  public gridHeight: number = 400;
  public headerHeight = 48;
  public rowHeight = 48;
  public columnDefs = [];
  public rowData = [];
  public gridOptions: GridOptions = <GridOptions>{};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enums: EnumsService,
    private prefs: PreferencesService,
    private service: DocumentsTypesService,
    private resolver: DocumentsTypesListResolve) { }

  ngOnInit() {
    this.isTabular = this.prefs.getPrefBoolean('documents-types', 'tabular');
    this.selectedId = this.route.params.pluck<number>('selid');
    this.route.data.pluck<DocumentsTypesListData>('list').subscribe(data => this.documentsTypesData.next(data));
    this.initGrid();
  }

  setTabular(checked) {
    this.isTabular = checked;
    this.prefs.setPrefBoolean('documents-types', 'tabular', this.isTabular);
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
    this.documentsTypesData.subscribe(data => {
      if (!data) {
        return;
      }
      this.columnDefs = [
        {
          headerName: 'Ind',
          field: 'individual',
          pinned: 'left',
          width: 48,
          cellStyle: { textAlign: 'center' },
          cellRendererFramework: {
            component: CheckboxRendererComponent,
            dependencies: []
          },
          /* app */
          onChange: (event, params) => {
            this.service.updateDocumentsTypes(params.data.id, params.data.name,
              event.srcElement.checked, params.data.top_ids, params.data.org_ids)
              .subscribe(_ => this.reloadData());
          }
        },
        {
          headerName: 'Document type',
          field: 'name',
          pinned: 'left',
          editable: true,
          onCellValueChanged: event => {
            this.service.updateDocumentsTypes(event.data.id, event.newValue,
              event.data.individual, event.data.top_ids, event.data.org_ids)
              .subscribe(_ => this.reloadData());
          }
        }
      ];
      data.organs.forEach(o => this.columnDefs.push({
        headerName: o.org_name,
        width: 48,
        cellStyle: { textAlign: 'center' },
        valueGetter: params => params.data.org_ids.indexOf(o.org_id) > -1,
        cellRendererFramework: {
          component: CheckboxRendererComponent,
          dependencies: []
        },
        /* app */
        onChange: (event, params) => {
          let newOrgIds = params.data.org_ids.slice(0);
          if (event.srcElement.checked) {
            if (newOrgIds.indexOf(o.org_id) === -1) {
              newOrgIds.push(o.org_id);
            }
          } else {
            if (newOrgIds.indexOf(o.org_id) > -1) {
              newOrgIds = newOrgIds.filter(oid => oid !== o.org_id);
            }
          }
          this.service.updateDocumentsTypes(params.data.id, params.data.name,
            params.data.individual, params.data.top_ids, newOrgIds)
            .subscribe(_ => this.reloadData());
        }

      }));
      data.topics.forEach(t => this.columnDefs.push({
        headerName: '<img md-tooltip="' + t.top_name + '" width="24" src="/assets/icons/topics/' + t.top_icon + '.png">',
        width: 48,
        cellStyle: { textAlign: 'center' },
        valueGetter: params => params.data.top_ids.indexOf(t.top_id) > -1,
        cellRendererFramework: {
          component: CheckboxRendererComponent,
          dependencies: []
        },
        /* app */
        onChange: (event, params) => {
          let newTopIds = params.data.top_ids.slice(0);
          if (event.srcElement.checked) {
            if (newTopIds.indexOf(t.top_id) === -1) {
              newTopIds.push(t.top_id);
            }
          } else {
            if (newTopIds.indexOf(t.top_id) > -1) {
              newTopIds = newTopIds.filter(oid => oid !== t.top_id);
            }
          }
          this.service.updateDocumentsTypes(params.data.id, params.data.name,
            params.data.individual, newTopIds, params.data.org_ids)
            .subscribe(_ => this.reloadData());
        }
      }));
    });
  }

  createRowData() {
    this.documentsTypesData.subscribe(data => {
      if (!data) {
        return;
      }
      const dtys = data.documentsTypes;
      this.gridHeight = this.rowHeight * (2 + dtys.length);
      this.rowData = dtys.map(dty => ({
        id: dty.documentType.dty_id,
        individual: dty.documentType.dty_individual_name,
        name: dty.documentType.dty_name,
        top_ids: dty.documentType.top_ids,
        org_ids: dty.documentType.org_ids
      }));
    });
  }

  private reloadData() {
    this.resolver.getData().subscribe(
      data => this.documentsTypesData.next(data as any)
    );
  }
}
