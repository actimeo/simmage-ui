import { Routes } from '@angular/router';

import { AdminCenterComponent } from './admin-center/admin-center.component';
import { UsersComponent } from './users/users.component';

import { CanActivateIfAdmin } from '../guards/can-activate-if-admin.guard';
import { CanActivateIfLogged } from '../guards/can-activate-if-logged.guard';

import { usergroupsRoutes } from './usergroups/usergroups.routing';

export const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminCenterComponent,
    canActivate: [CanActivateIfLogged, CanActivateIfAdmin],
    children: [
      { path: '' },
      ...usergroupsRoutes,
      { path: 'users', component: UsersComponent },
      { path: 'topics', loadChildren: 'app/admin/topics/topics.module#TopicsModule' },
      { path: 'organs', loadChildren: 'app/admin/organs/organs.module#OrgansModule' }
    ]
  }
];

