import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { UsergroupComponent } from './usergroup/usergroup.component';
import { UsergroupsComponent } from './usergroups-center/usergroups.component';
import { UsergroupsListComponent } from './usergroups-list/usergroups-list.component';

import { UsergroupResolve } from './usergroup-resolve.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';

export const usergroupsRoutes: Routes = [
  {
    path: '', component: UsergroupsComponent, children: [
      { path: '', component: UsergroupsListComponent }
    ]
  },
  {
    path: 'new', component: UsergroupsComponent, children: [
      { path: '', component: UsergroupsListComponent },
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
      { path: '', component: UsergroupsListComponent },
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
