import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-ng2/main';
import { CheckboxRendererComponent } from './../../grid/renderers/checkbox';
import { SharedModule } from '../../shared/shared.module';

import { documentsTypesRouting } from './documents-types.routing';
import { DocumentsTypesCenterComponent } from './documents-types-center/documents-types-center.component';
import { DocumentsTypesListComponent } from './documents-types-list/documents-types-list.component';
import { DocumentsTypesFormComponent } from './documents-types-form/documents-types-form.component';

import { DocumentsTypesService } from './documents-types.service';
import { DocumentsTypesResolve } from './documents-types-resolve.guard';
import { DocumentsTypesListResolve } from './documents-types-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule.forRoot(),
    documentsTypesRouting,
    AgGridModule
  ],
  declarations: [
    DocumentsTypesCenterComponent,
    DocumentsTypesListComponent,
    DocumentsTypesFormComponent
  ],
  providers: [
    DocumentsTypesService,
    DocumentsTypesResolve,
    DocumentsTypesListResolve
  ]
})
export class DocumentsTypesModule { }
