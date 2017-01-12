 import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

 import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';

import { NoteComponent } from './note-form/note.component';
import { NotesComponent } from './notes-list/notes.component';
import { NotesCenterComponent } from './notes-center/notes-center.component';

import { NotesListResolve } from './notes-list-resolve.guard';
import { NoteResolve } from './note-resolve.guard';

 export const notesRoutes: Routes = [
	 {
			path: '', component:  NotesCenterComponent, resolve: { data: NotesListResolve }, 
			children: [	{ path: '', component: NotesComponent } ]
		},
		{
			path: 'new', component:  NotesCenterComponent, resolve: { data: NotesListResolve }, 
			children: [ 
				{ path: '', component: NotesComponent },
				{
					path: '',
					component: NoteComponent,
					canDeactivate: [CanDeactivateGuard],
					outlet: 'details'
				}
			]
		},
		{
			path: ':id', component:  NotesCenterComponent, resolve: { data: NotesListResolve }, 
			children: [
				{ path: '', component: NotesComponent },
				{
					path: '',
					component: NoteComponent,
					resolve: { note: NoteResolve },
					canDeactivate: [CanDeactivateGuard],
					outlet: 'details'
				}
			]
		}
 ];

 export const notesRouting = RouterModule.forChild(notesRoutes)