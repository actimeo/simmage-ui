import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { NotesViewsCenterComponent } from './notes-views-center/notes-views-center.component';
import { NotesViewsFormComponent } from './notes-views-form/notes-views-form.component';
import { NotesViewsListComponent } from './notes-views-list/notes-views-list.component';
import { NotesViewsListResolve } from './notes-views-list-resolve.guard';
import { NotesViewsResolve } from './notes-views-resolve.guard';

export const notesViewsRoutes: Routes = [
  {
    path: '', component: NotesViewsCenterComponent, children: [
      {
        path: '',
        component: NotesViewsListComponent,
        resolve: { list: NotesViewsListResolve }
      }
    ]
  },
  {
    path: 'new', component: NotesViewsCenterComponent, children: [
      {
        path: '',
        component: NotesViewsListComponent,
        resolve: { list: NotesViewsListResolve }
      },
      {
        path: '',
        component: NotesViewsFormComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: NotesViewsCenterComponent, children: [
      {
        path: '',
        component: NotesViewsListComponent,
        resolve: { list: NotesViewsListResolve }
      },
      {
        path: '',
        component: NotesViewsFormComponent,
        resolve: { notesViews: NotesViewsResolve },
  canDeactivate: [CanDeactivateGuard],
  outlet: 'details'
      }
]
  }
];

export const notesViewsRouting = RouterModule.forChild(notesViewsRoutes);
