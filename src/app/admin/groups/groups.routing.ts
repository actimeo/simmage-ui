import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './groups-center/groups.component';
/*
import { PortalComponent } from './portal/portal.component';
import { PortalsListComponent } from './portals-list/portals-list.component';

import { PortalResolve } from './portal-resolve.guard';

import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
*/

export const groupsRoutes: Routes = [
  {
    path: '', component: GroupsComponent,
/*    children: [
      { path: '', pathMatch: 'full', component: PortalsListComponent },
      { path: 'new', component: PortalComponent },
      {
        path: ':id', component: PortalComponent,
        resolve: { topic: PortalResolve },
        canDeactivate: [CanDeactivateGuard]
      }
    ]*/
  },
];

export const groupsRouting = RouterModule.forChild(groupsRoutes);
