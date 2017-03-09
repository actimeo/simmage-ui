import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { DocumentsViewsCenterComponent } from './documents-views-center/documents-views-center.component';
import { DocumentsViewsFormComponent } from './documents-views-form/documents-views-form.component';
import { DocumentsViewsListComponent } from './documents-views-list/documents-views-list.component';
import { DocumentsViewsListResolve } from './documents-views-list-resolve.guard';
import { DocumentsViewsResolve } from './documents-views-resolve.guard';
import { ModuleWithProviders } from '@angular/core';

export const documentsViewsRoutes: Routes = [
  {
    path: '', component: DocumentsViewsCenterComponent, children: [
      {
        path: '',
        component: DocumentsViewsListComponent,
        resolve: { list: DocumentsViewsListResolve }
      }
    ]
  },
  {
    path: 'new', component: DocumentsViewsCenterComponent, children: [
      {
        path: '',
        component: DocumentsViewsListComponent,
        resolve: { list: DocumentsViewsListResolve }
      },
      {
        path: '',
        component: DocumentsViewsFormComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: DocumentsViewsCenterComponent, children: [
      {
        path: '',
        component: DocumentsViewsListComponent,
        resolve: { list: DocumentsViewsListResolve }
      },
      {
        path: '',
        component: DocumentsViewsFormComponent,
        resolve: { documentsViews: DocumentsViewsResolve },
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  }
];

export const documentsViewsRouting = RouterModule.forChild(documentsViewsRoutes);
