import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { GroupsComponent } from './groups-center/groups.component';
import { groupsRouting } from './groups.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    groupsRouting,
  ],
  declarations: [GroupsComponent]
})
export class GroupsModule { }
