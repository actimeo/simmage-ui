import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { objectivesViewsRouting } from './objectives-views.routing';
import { ObjectivesViewsCenterComponent } from './objectives-views-center/objectives-views-center.component';
import { ObjectivesViewsListComponent } from './objectives-views-list/objectives-views-list.component';
import { ObjectivesViewsFormComponent } from './objectives-views-form/objectives-views-form.component';

import { ObjectivesViewsService } from './objectives-views.service';
import { ObjectivesViewsResolve } from './objectives-views-resolve.guard';
import { ObjectivesViewsListResolve } from './objectives-views-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    objectivesViewsRouting
  ],
  declarations: [
    ObjectivesViewsCenterComponent,
    ObjectivesViewsListComponent,
    ObjectivesViewsFormComponent
  ],
  providers: [
    ObjectivesViewsService,
    ObjectivesViewsResolve,
    ObjectivesViewsListResolve
  ]
})
export class ObjectivesViewsModule { }
