import { Routes, RouterModule } from '@angular/router';

import { PortalsComponent } from './portals-center/portals.component';

import { PortalComponent } from './portal/portal.component';
import { PortalsListComponent } from './portals-list/portals-list.component';

import { PortalResolve } from './portal-resolve.guard';

import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';


export const portalsRoutes: Routes = [
  {
    path: '', component: PortalsComponent, children: [
      { path: '', component: PortalsListComponent }
    ]
  },
  {
    path: 'new', component: PortalsComponent, children: [
      { path: '', component: PortalsListComponent },
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
      { path: '', component: PortalsListComponent },
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
