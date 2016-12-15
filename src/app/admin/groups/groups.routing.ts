import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { GroupsComponent } from './groups-center/groups.component';

import { GroupComponent } from './group/group.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

import { GroupResolve } from './group-resolve.guard';
import { GroupListResolve } from './group-list-resolve.guard';

import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';


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
