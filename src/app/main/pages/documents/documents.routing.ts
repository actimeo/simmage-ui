import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../../services/guards/can-deactivate.guard';
import { DocumentComponent } from './document-form/document.component';
import { DocumentResolve } from './document-resolve.guard';
import {DocumentsCenterComponent} from './documents-center/documents-center.component';
import { DocumentsComponent } from './documents-list/documents.component';
import { DocumentsListResolve } from './documents-list-resolve.guard';
import { ModuleWithProviders } from '@angular/core';

export const documentsRoutes: Routes = [
   {
      path: '', component: DocumentsCenterComponent, resolve: { data: DocumentsListResolve },
      children: [ { path: '', component: DocumentsComponent } ]
    },
    {
      path: 'new', component: DocumentsCenterComponent, resolve: { data: DocumentsListResolve },
      children: [
        { path: '', component: DocumentsComponent },
        {
          path: '',
          component: DocumentComponent,
          canDeactivate: [CanDeactivateGuard],
          outlet: 'details'
        }
      ]
    },
    {
      path: ':id', component: DocumentsCenterComponent, resolve: { data: DocumentsListResolve },
      children: [
        { path: '', component: DocumentsComponent },
        {
          path: '',
          component: DocumentComponent,
          resolve: { document: DocumentResolve },
          canDeactivate: [CanDeactivateGuard],
          outlet: 'details'
        }
      ]
    }
 ];

export const documentsRouting = RouterModule.forChild(documentsRoutes);
