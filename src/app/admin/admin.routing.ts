import { Routes } from '@angular/router';

import { AdminCenterComponent } from './admin-center/admin-center.component';
import { UsergroupsComponent } from './usergroups/usergroups.component';
import { UsersComponent } from './users/users.component';

import { CanActivateIfAdmin } from '../guards/can-activate-if-admin.guard';
import { CanActivateIfLogged } from '../guards/can-activate-if-logged.guard';

import { topicsRoutes } from './topics/topics.routing';
import { organsRoutes } from './organs/organs.routing';

export const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminCenterComponent,
    canActivate: [CanActivateIfLogged, CanActivateIfAdmin],
    children: [
      { path: '' },
      ...topicsRoutes,
      ...organsRoutes,
      { path: 'usergroups', component: UsergroupsComponent },
      { path: 'users', component: UsersComponent },
    ]
  }
];

