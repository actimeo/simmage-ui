import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { GroupComponent } from './group/group.component';
import { GroupListResolve } from './group-list-resolve.guard';
import { GroupResolve } from './group-resolve.guard';
import { GroupsComponent } from './groups-center/groups.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { ModuleWithProviders } from '@angular/core';

export const groupsRoutes: Routes = [
  {
    path: '', component: GroupsComponent, children: [
      {
        path: '',
        component: GroupsListComponent,
        resolve: { list: GroupListResolve }
      }
    ]
  },
  {
    path: 'new', component: GroupsComponent, children: [
      {
        path: '',
        component: GroupsListComponent,
        resolve: { list: GroupListResolve }
      },
      {
        path: '',
        component: GroupComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: GroupsComponent, children: [
      {
        path: '',
        component: GroupsListComponent,
        resolve: { list: GroupListResolve }
      },
      {
        path: '',
        component: GroupComponent,
        resolve: { group: GroupResolve },
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  }
];

export const groupsRouting = RouterModule.forChild(groupsRoutes);
