import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { notesViewsRouting } from './notes-views.routing';
import { NotesViewsCenterComponent } from './notes-views-center/notes-views-center.component';
import { NotesViewsListComponent } from './notes-views-list/notes-views-list.component';
import { NotesViewsFormComponent } from './notes-views-form/notes-views-form.component';

import { NotesViewsService } from './notes-views.service';
import { NotesViewsResolve } from './notes-views-resolve.guard';
import { NotesViewsListResolve } from './notes-views-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule.forRoot(),
    notesViewsRouting
  ],
  declarations: [
    NotesViewsCenterComponent,
    NotesViewsListComponent,
    NotesViewsFormComponent
  ],
  providers: [
    NotesViewsService,
    NotesViewsResolve,
    NotesViewsListResolve
  ]
})
export class NotesViewsModule { }
