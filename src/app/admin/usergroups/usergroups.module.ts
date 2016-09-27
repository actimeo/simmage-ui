import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MdButtonModule } from '@angular2-material/button/button';
import { MdCardModule } from '@angular2-material/card/card';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdInputModule } from '@angular2-material/input/input';
import { MdListModule } from '@angular2-material/list/list';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';

import { usergroupsRouting } from './usergroups.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsergroupComponent } from './usergroup/usergroup.component';
import { UsergroupsComponent } from './usergroups-center/usergroups.component';
import { UsergroupsListComponent } from './usergroups-list/usergroups-list.component';

import { SearchGroupsComponent } from '../search/search-groups/search-groups.component';

import { UsergroupResolve } from './usergroup-resolve.guard';
import { UsergroupsService } from './usergroups.service';

import { OrganService } from '../organs/organ.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdToolbarModule,
    MdListModule,
    MdIconModule,

    SharedModule.forRoot(),
    usergroupsRouting,
  ],
  declarations: [
    UsergroupComponent,
    UsergroupsComponent,
    UsergroupsListComponent,
    SearchGroupsComponent,
  ],
  providers: [
    MdIconRegistry,
    UsergroupResolve,
    UsergroupsService,
    OrganService
  ],
  exports: [
  ]
})
export class UsergroupsModule {
}
