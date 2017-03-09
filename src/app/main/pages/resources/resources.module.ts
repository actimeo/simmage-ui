import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

import { resourcesRouting } from './resources.routing';
import { ResourceComponent } from './resource-form/resource.component';
import { ResourcesCenterComponent } from './resources-center/resources-center.component';
import { ResourcesComponent } from './resources-list/resources.component';

import { ResourceService } from './resource.service';
import { ResourceResolve } from './resource-resolve.guard';
import { ResourcesListResolve } from './resources-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    resourcesRouting
  ],
  declarations: [
    ResourceComponent,
    ResourcesCenterComponent,
    ResourcesComponent
  ],
  providers: [
    ResourceService,
    ResourceResolve,
    ResourcesListResolve
  ]
})
export class ResourcesModule { }
