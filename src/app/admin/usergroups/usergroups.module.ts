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

import { OrganService } from '../organs/organ.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule.forRoot(),
    usergroupsRouting,
  ],
  declarations: [
    UsergroupComponent,
    UsergroupsComponent,
    UsergroupsListComponent
      ],
  providers: [
    UsergroupResolve,
    UsergroupsService,
    OrganService
  ],
  exports: [
  ]
})
export class UsergroupsModule {
}
