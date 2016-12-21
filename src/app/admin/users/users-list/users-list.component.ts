import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { GridOptions } from 'ag-grid/main';

import { UsersService } from '../users.service';
import { DbUserDetails } from '../../../db-models/login';
import { PreferencesService } from '../../../shared/preferences.service';
import { UsersListResolve, UsersListData } from '../users-list-resolve.guard';

import { CheckboxRendererComponent } from '../../../grid/renderers/checkbox';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  isTabular: boolean = false;
  public usersData: BehaviorSubject<UsersListData> = new BehaviorSubject<UsersListData>(null);

  public selectedLogin: Observable<string>;
  public selectedUsergroup: Observable<number> = null;
  public lastSelectedUsergroup: number;

  // ag-grid
  public gridHeight: number = 400;
  public headerHeight = 48;
  public rowHeight = 64;
  public columnDefs = [];
  public rowData = [];
  public gridOptions: GridOptions = <GridOptions>{};

  constructor(private usersService: UsersService, private route: ActivatedRoute, private prefs: PreferencesService,
    private resolver: UsersListResolve) { }

  ngOnInit() {
    this.selectedUsergroup = this.route.params.pluck('selusergroup')
      .map((ugr: number) => this.lastSelectedUsergroup = ugr);
    this.route.data.pluck('list')
      .subscribe((data: UsersListData) => this.usersData.next(data));
    this.selectedLogin = this.route.params.pluck('selogin');

    this.isTabular = this.prefs.getPrefBoolean('users-list', 'tabular');
    this.initGrid();
  }

  setTabular(checked) {
    this.isTabular = checked;
    this.prefs.setPrefBoolean('users-list', 'tabular', this.isTabular);
    this.initGrid();
  }

  initGrid() {
    if (!this.isTabular) {
      return;
    }
    this.createColumnDefs();
    this.createRowData();
  }

  createColumnDefs() {
    this.usersData.subscribe(data => {
      if (!data) {
        return;
      }
      this.columnDefs = [
        {
          headerName: 'Username',
          field: 'username',
          suppressSorting: true,
          pinned: 'left'
        },
        {
          headerName: 'Login',
          field: 'usr_login',
        },
      ];
      data.userRights.forEach(ur => this.columnDefs.push({
        headerName: ur,
        width: 100,
        cellStyle: { textAlign: 'center' },
        valueGetter: params => params.data.usr_rights.indexOf(ur) > -1,
        cellRendererFramework: {
          component: CheckboxRendererComponent,
          dependencies: []
        },
        onChange: (event, params) => {
          let newRightsIds = params.data.usr_rights.slice(0);
          if (event.target.checked) {
            if (newRightsIds.indexOf(ur) === -1) {
              newRightsIds.push(ur);
            }
          } else {
            if (newRightsIds.indexOf(ur) > -1) {
              newRightsIds = newRightsIds.filter(oid => oid !== ur);
            }
          }
          this.usersService.updateUser(
            params.data.usr_login, newRightsIds, params.data.par_id,
            params.data.ugr_id !== 0 ? params.data.ugr_id : null)
            .subscribe(_ => this.reloadData());
        }
      }));

      let usergroups: Array<string> = ['Admin'].concat(data.usergroups.map(ugr => ugr.ugr_name));
      this.columnDefs.push({
        headerName: 'Usergroup',
        field: 'ugr_name',
        editable: true,
        cellEditor: 'select',
        cellEditorParams: { values: usergroups },
        onCellValueChanged: (params) => {
          let newUgr: number;
          if (params.newValue === 'Admin') {
            newUgr = null;
          }
          if (newUgr !== null) {
            newUgr = data.usergroups.filter(ugr => params.newValue === ugr.ugr_name)
              .map(ugr => ugr.ugr_id).pop();
          }
          this.usersService.updateUser(params.data.usr_login, params.data.usr_rights, params.data.par_id, newUgr)
            .subscribe(_ => this.reloadData());
        }
      });
    });
  }

  createRowData() {
    this.usersData.subscribe(data => {
      if (!data) {
        return;
      }
      this.gridHeight = this.rowHeight * (2 + data.users.length);
      this.rowData = data.users.map(usr => ({
        usr_login: usr.usr_login,
        usr_rights: usr.usr_rights ? usr.usr_rights : [],
        par_id: usr.par_id,
        username: usr.par_firstname + ' ' + usr.par_lastname,
        ugr_id: usr.ugr_id,
        ugr_name: usr.ugr_name ? usr.ugr_name : 'Admin'
      }));
    });
  }

  private reloadData() {
    this.resolver.getData(this.lastSelectedUsergroup ? this.lastSelectedUsergroup : 0).subscribe(
      data => this.usersData.next(data as any)
    );
  }

  isSelected(user: DbUserDetails): boolean {
    let ret = false;
    this.selectedLogin.subscribe(l => { ret = (l === user.usr_login); });
    return ret;
  }

}
