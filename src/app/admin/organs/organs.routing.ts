import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { OrganComponent } from './organ/organ.component';
import { OrganListResolve } from './organ-list-resolve.guard';
import { OrganResolve } from './organ-resolve.guard';
import { OrgansComponent } from './organs-center/organs.component';
import { OrgansListComponent } from './organs-list/organs-list.component';

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
