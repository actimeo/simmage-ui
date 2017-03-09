import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { teamsRouting } from './teams.routing';
import { SharedModule } from '../shared/shared.module';

import { TeamsCenterComponent } from './teams-center/teams-center.component';
import { TeamsSidenavComponent } from './teams-sidenav/teams-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    teamsRouting,
    SharedModule
  ],
  declarations: [
    TeamsCenterComponent,
    TeamsSidenavComponent
  ]
})
export class TeamsModule { }
