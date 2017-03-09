import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { DocumentsTypesCenterComponent } from './documents-types-center/documents-types-center.component';
import { DocumentsTypesFormComponent } from './documents-types-form/documents-types-form.component';
import { DocumentsTypesListComponent } from './documents-types-list/documents-types-list.component';
import { DocumentsTypesListResolve } from './documents-types-list-resolve.guard';
import { DocumentsTypesResolve } from './documents-types-resolve.guard';
import { ModuleWithProviders } from '@angular/core';

export const documentsTypesRoutes: Routes = [
  {
    path: '', component: DocumentsTypesCenterComponent, children: [
      {
        path: '',
        component: DocumentsTypesListComponent,
        resolve: { list: DocumentsTypesListResolve }
      }
    ]
  },
  {
    path: 'new', component: DocumentsTypesCenterComponent, children: [
      {
        path: '',
        component: DocumentsTypesListComponent,
        resolve: { list: DocumentsTypesListResolve }
      },
      {
        path: '',
        component: DocumentsTypesFormComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: DocumentsTypesCenterComponent, children: [
      {
        path: '',
        component: DocumentsTypesListComponent,
        resolve: { list: DocumentsTypesListResolve }
      },
      {
        path: '',
        component: DocumentsTypesFormComponent,
        resolve: { documentsTypes: DocumentsTypesResolve },
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },

  {
    path: '', component: DocumentsTypesCenterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DocumentsTypesListComponent,
        resolve: { list: DocumentsTypesListResolve }
      },
      { path: 'new', component: DocumentsTypesFormComponent },
      {
        path: ':id', component: DocumentsTypesFormComponent,
        resolve: { documentsTypes: DocumentsTypesResolve },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];

export const documentsTypesRouting = RouterModule.forChild(documentsTypesRoutes);
