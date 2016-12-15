import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { OrgansComponent } from './organs-center/organs.component';
import { OrganComponent } from './organ/organ.component';
import { OrgansListComponent } from './organs-list/organs-list.component';

import { OrganResolve } from './organ-resolve.guard';
import { OrganListResolve } from './organ-list-resolve.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';

export const organsRoutes: Routes = [
  {
    path: '', component: OrgansComponent, children: [
      {
        path: '',
        component: OrgansListComponent,
        resolve: { list: OrganListResolve }
      }
    ]
  },
  {
    path: 'new', component: OrgansComponent, children: [
      {
        path: '',
        component: OrgansListComponent,
        resolve: { list: OrganListResolve }
      },
      {
        path: '',
        component: OrganComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: OrgansComponent, children: [
      {
        path: '',
        component: OrgansListComponent,
        resolve: { list: OrganListResolve }
      },
      {
        path: '',
        component: OrganComponent,
        resolve: { organ: OrganResolve },
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  }
];

export const organsRouting = RouterModule.forChild(organsRoutes);
