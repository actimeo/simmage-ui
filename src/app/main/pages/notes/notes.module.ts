import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

import { notesRouting } from './notes.routing';
import { NotesCenterComponent } from './notes-center/notes-center.component';
import { NotesComponent } from './notes-list/notes.component';

import { NoteResolve } from './note-resolve.guard';
import { NotesListResolve } from './notes-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    notesRouting
  ],
  declarations: [
    NotesCenterComponent,
    NotesComponent
  ],
  providers: [
    NoteResolve,
    NotesListResolve
  ]
})
export class NotesModule { }
