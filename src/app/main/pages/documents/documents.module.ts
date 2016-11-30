import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

import { documentsRouting } from './documents.routing';
import { DocumentComponent } from './document-form/document.component';
import { DocumentsCenterComponent } from './documents-center/documents-center.component';
import { DocumentsComponent } from './documents-list/documents.component';

import { DocumentService } from './document.service';
import { DocumentResolve } from './document-resolve.guard';
import { DocumentsListResolve } from './documents-list-resolve.guard'; 

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		SharedModule.forRoot(),
		documentsRouting
	],
	declarations: [
		DocumentComponent,
		DocumentsCenterComponent,
		DocumentsComponent
	],
	providers: [
		DocumentService,
		DocumentResolve,
		DocumentsListResolve
	]
})
export class DocumentsModule { }
