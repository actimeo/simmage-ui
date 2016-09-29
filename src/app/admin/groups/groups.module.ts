import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MaterialModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GroupsComponent } from './groups-center/groups.component';
import { GroupComponent } from './group/group.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

import { groupsRouting } from './groups.routing';
import { GroupService } from './group.service';

import { GroupResolve } from './group-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    groupsRouting,
  ],
  declarations: [
    GroupsComponent,
    GroupComponent,
    GroupsListComponent
  ],
  providers: [
    GroupService,
    GroupResolve
  ]
})
export class GroupsModule { }
