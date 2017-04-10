import { UsergroupsResolve } from './usergroups-list-resolve.guard';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { UsergroupResolve } from './usergroup-resolve.guard';
import { UsergroupsComponent } from './usergroups-center/usergroups.component';
import { UsergroupsListComponent } from './usergroups-list/usergroups-list.component';

export const usergroupsRoutes: Routes = [
  {
    path: '', component: UsergroupsComponent, children: [
      {
        path: '', component: UsergroupsListComponent,
        resolve: { list: UsergroupsResolve }
      }
    ]
  },
  {
    path: 'new', component: UsergroupsComponent, children: [
      {
        path: '', component: UsergroupsListComponent,
        resolve: { list: UsergroupsResolve }
      },
      {
        path: '',
        component: UsergroupComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: UsergroupsComponent, children: [
      {
        path: '', component: UsergroupsListComponent,
        resolve: { list: UsergroupsResolve }
      },
      {
        path: '',
        component: UsergroupComponent,
        resolve: { usergroup: UsergroupResolve },
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  }
];

export const usergroupsRouting = RouterModule.forChild(usergroupsRoutes);
