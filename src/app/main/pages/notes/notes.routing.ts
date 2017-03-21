import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { NoteResolve } from './note-resolve.guard';
import {NotesCenterComponent} from './notes-center/notes-center.component';
import { NotesComponent } from './notes-list/notes.component';
import { NotesListResolve } from './notes-list-resolve.guard';

export const notesRoutes: Routes = [
   {
      path: '', component:  NotesCenterComponent, resolve: { data: NotesListResolve },
      children: [  { path: '', component: NotesComponent } ]
    }
 ];

export const notesRouting = RouterModule.forChild(notesRoutes);
