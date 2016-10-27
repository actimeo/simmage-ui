import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdCheckbox } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { GridOptions } from 'ag-grid/main';

import { UsersService } from '../users.service';
import { DbUserDetails, DbUsergroup } from '../../../db-models/login';
import { DbParticipant } from '../../../db-models/organ';
import { PreferencesService } from '../../../shared/preferences.service';
import { UsersListResolve } from '../users-list-resolve.guard';

import { CheckboxRendererComponent } from '../../../grid/renderers/checkbox';
import { SelectboxRendererComponent } from '../../../grid/renderers/selectbox';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  isTabular: boolean = false;
  public usersData: BehaviorSubject<DbUserDetails[]> = new BehaviorSubject<DbUserDetails[]>(null);

  public selectedLogin: Observable<string>;
  public selectedUsergroup: Observable<number> = null;
  public lastSelectedUsergroup: number;

  public usergroupList: Observable<DbUsergroup[]> = null;
  public participantList: Observable<DbParticipant[]> = null;

  public userRightsList: Array<string> = ['structure', 'organization', 'users']; // Todo : retrieve them from DB ? (if new rights implemented)

  // ag-grid
  public gridHeight: number = 400;
  public headerHeight = 48;
  public rowHeight = 64;
  public columnDefs = [];
  public rowData = [];
  public gridOptions: GridOptions = <GridOptions>{};

  constructor(private usersService: UsersService, private route: ActivatedRoute, private prefs: PreferencesService,
    private resolver: UsersListResolve) {
    this.usergroupList = this.usersService.loadUsergroups();
    this.participantList = this.usersService.loadParticipants();
  }

  ngOnInit() {
    this.selectedUsergroup = this.route.params.pluck<number>('selusergroup').map(ugr => this.lastSelectedUsergroup = ugr);
    this.route.data.pluck<DbUserDetails[]>('list').subscribe(data => this.usersData.next(data));
    this.selectedLogin = this.route.params.pluck<string>('selogin');

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
      let usernames: Array<string> = [];
      this.participantList.subscribe(part => {
        part.forEach(p => {
          usernames.push(p.par_firstname + ' ' + p.par_lastname);
        });
      });
      this.columnDefs = [
        {
          headerName: 'Username',
          field: 'username',
          suppressSorting: true,
          pinned: 'left',
          cellEditor: 'select',
          cellEditorParams: { values: usernames },
          onCellValueChanged: (params) => {
            let newPar: number;
            this.participantList.subscribe(data => {
              data.forEach(part => {
                if (params.data.username == (part.par_firstname + " " + part.par_lastname)) {
                  newPar = part.par_id;
                  return;
                }
              });
              this.usersService.updateUser(params.data.usr_login, params.data.usr_rights, newPar, params.data.ugr_id)
                .subscribe(_ => this.reloadData(), () => this.reloadData() /* show an error message to the user */);
            });
          },
          editable: true
        },
        {
          headerName: 'Login',
          field: 'usr_login',
          pinned: 'left'
        },
      ];
      this.userRightsList.forEach(ur => this.columnDefs.push({
        headerName: ur,
        width: 100,
        cellStyle: { textAlign: 'center' },
        valueGetter: params => params.data.usr_rights.indexOf(ur) > -1,
        cellRendererFramework: {
          component: CheckboxRendererComponent,
          dependencies: [MdCheckbox]
        },
        onChange: (event, params) => {
          let newRightsIds = params.data.usr_rights.slice(0);
          if (event.checked) {
            if(newRightsIds.indexOf(ur) === -1) {
              newRightsIds.push(ur);
            }
          } else {
            if (newRightsIds.indexOf(ur) > -1) {
              newRightsIds = newRightsIds.filter(oid => oid !== ur);
            }
          }
          this.usersService.updateUser(params.data.usr_login, newRightsIds, params.data.par_id, params.data.ugr_id !== 0 ? params.data.ugr_id : null)
            .subscribe(_ => this.reloadData());
        }
      }));
      /*let optionNodes: Array<any> = [];
      optionNodes.push({ value: 0, textNode: 'Admin' });
      this.usergroupList.subscribe(data => {
        data.forEach(e => {
          optionNodes.push({ value: e.ugr_id, textNode: e.ugr_name });
        });
      });
      this.columnDefs.push({
        headerName: 'Usergroup',
        field: 'ugr_name',
        editable: true,
        cellEditorFramework: {
          component: SelectboxRendererComponent,
          moduleImports: [CommonModule, FormsModule]
        },
        cellEditorParams: {
          options: {
            values: optionNodes
          }
        },
        onCellValueChanged: (params) => {
          console.log(params);
        }
      });*/ // V1

      let usergroups: Array<any> = [];
      usergroups.push('Admin');
      this.usergroupList.subscribe(data => {
        data.forEach(e => {
          usergroups.push(e.ugr_name);
        });
      });
      this.columnDefs.push({
        headerName: 'Usergroup',
        field: 'ugr_name',
        editable: true,
        cellEditor: 'select',
        cellEditorParams: { values: usergroups },
        onCellValueChanged: (params) => {
          let newUgr: number;
          if (params.data.ugr_name == 'Admin') {
            newUgr = null;
          }
          this.usergroupList.subscribe(data => {
            if (newUgr !== null) {
              data.forEach(ugr => {
                if (params.data.ugr_name == ugr.ugr_name) {
                  newUgr = ugr.ugr_id;
                  return;
                }
              });
            }
            this.usersService.updateUser(params.data.usr_login, params.data.usr_rights, params.data.par_id, newUgr)
              .subscribe(_ => this.reloadData());
          });
        }
      }); // V2
    });
  }

  createRowData() {
    this.usersData.subscribe(data => {
      if (!data) {
        return;
      }
      this.gridHeight = this.rowHeight * (2 + data.length);
      this.rowData = data.map(usr => ({
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
    let ret: boolean = false;
    this.selectedLogin.subscribe(l => {ret = (l === user.usr_login); });
    return ret;
  }

}
