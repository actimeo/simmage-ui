import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { documentsViewsRouting } from './documents-views.routing';
import { DocumentsViewsCenterComponent } from './documents-views-center/documents-views-center.component';
import { DocumentsViewsListComponent } from './documents-views-list/documents-views-list.component';
import { DocumentsViewsFormComponent } from './documents-views-form/documents-views-form.component';

import { DocumentsViewsService } from './documents-views.service';
import { DocumentsViewsResolve } from './documents-views-resolve.guard';
import { DocumentsViewsListResolve } from './documents-views-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    documentsViewsRouting
  ],
  declarations: [
    DocumentsViewsCenterComponent,
    DocumentsViewsListComponent,
    DocumentsViewsFormComponent
  ],
  providers: [
    DocumentsViewsService,
    DocumentsViewsResolve,
    DocumentsViewsListResolve
  ]
})
export class DocumentsViewsModule { }
