import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { documentsViewsRouting } from './documents-views.routing';
import { DocumentsViewsComponent } from './documents-views.component';

@NgModule({
  imports: [
    CommonModule,
    documentsViewsRouting
  ],
  declarations: [DocumentsViewsComponent]
})
export class DocumentsViewsModule { }
