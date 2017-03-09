import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { resourcesViewsRouting } from './resources-views.routing';
import { ResourcesViewsCenterComponent } from './resources-views-center/resources-views-center.component';
import { ResourcesViewsListComponent } from './resources-views-list/resources-views-list.component';
import { ResourcesViewsFormComponent } from './resources-views-form/resources-views-form.component';

import { ResourcesViewsService } from './resources-views.service';
import { ResourcesViewsResolve } from './resources-views-resolve.guard';
import { ResourcesViewsListResolve } from './resources-views-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    resourcesViewsRouting
  ],
  declarations: [
    ResourcesViewsCenterComponent,
    ResourcesViewsListComponent,
    ResourcesViewsFormComponent
  ],
  providers: [
    ResourcesViewsService,
    ResourcesViewsResolve,
    ResourcesViewsListResolve
  ]
})
export class ResourcesViewsModule { }
