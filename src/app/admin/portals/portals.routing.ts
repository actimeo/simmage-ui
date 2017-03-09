import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { PortalComponent } from './portal/portal.component';
import { PortalListResolve } from './portal-list-resolve.guard';
import { PortalResolve } from './portal-resolve.guard';
import { PortalsComponent } from './portals-center/portals.component';
import { PortalsListComponent } from './portals-list/portals-list.component';

export const portalsRoutes: Routes = [
  {
    path: '', component: PortalsComponent, children: [
      {
        path: '', component: PortalsListComponent,
        resolve: { list: PortalListResolve }
      }
    ]
  },
  {
    path: 'new', component: PortalsComponent, children: [
      {
        path: '', component: PortalsListComponent,
        resolve: { list: PortalListResolve }
      },
      {
        path: '',
        component: PortalComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: PortalsComponent, children: [
      {
        path: '', component: PortalsListComponent,
        resolve: { list: PortalListResolve }
      },
      {
        path: '',
        component: PortalComponent,
        resolve: { portal: PortalResolve },
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  }
];

export const portalsRouting = RouterModule.forChild(portalsRoutes);
