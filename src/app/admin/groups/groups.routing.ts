import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './groups-center/groups.component';

import { GroupComponent } from './group/group.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

import { GroupResolve } from './group-resolve.guard';

import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';


export const groupsRoutes: Routes = [
  {
    path: '', component: GroupsComponent,
    children: [
      { path: '', pathMatch: 'full', component: GroupsListComponent },
      { path: 'new', component: GroupComponent },
      {
        path: ':id', component: GroupComponent,
        resolve: { group: GroupResolve },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];

export const groupsRouting = RouterModule.forChild(groupsRoutes);
