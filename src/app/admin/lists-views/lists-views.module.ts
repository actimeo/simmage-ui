import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { listsViewsRouting } from './lists-views.routing';
import { ListsViewsCenterComponent } from './lists-views-center/lists-views-center.component';
import { ListsViewsListComponent } from './lists-views-list/lists-views-list.component';
import { ListsViewsFormComponent } from './lists-views-form/lists-views-form.component';

import { ListsViewsService } from './lists-views.service';
import { ListsViewsResolve } from './lists-views-resolve.guard';
import { ListsViewsListResolve } from './lists-views-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule.forRoot(),
    listsViewsRouting
  ],
  declarations: [
    ListsViewsCenterComponent,
    ListsViewsListComponent,
    ListsViewsFormComponent
  ],
  providers: [
    ListsViewsService,
    ListsViewsResolve,
    ListsViewsListResolve
  ]
})
export class ListsViewsModule { }
