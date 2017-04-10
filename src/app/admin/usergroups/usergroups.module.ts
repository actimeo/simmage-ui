import { UsergroupsResolve } from './usergroups-list-resolve.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MaterialModule } from '@angular/material';

import { usergroupsRouting } from './usergroups.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsergroupComponent } from './usergroup/usergroup.component';
import { UsergroupsComponent } from './usergroups-center/usergroups.component';
import { UsergroupsListComponent } from './usergroups-list/usergroups-list.component';

import { UsergroupResolve } from './usergroup-resolve.guard';
import { UsergroupsService } from './usergroups.service';

import { OrganService } from '../../services/backend/organ.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    usergroupsRouting,
  ],
  declarations: [
    UsergroupComponent,
    UsergroupsComponent,
    UsergroupsListComponent
      ],
  providers: [
    UsergroupResolve,
    UsergroupsResolve,
    UsergroupsService,
    OrganService
  ],
  exports: [
  ]
})
export class UsergroupsModule {
}
