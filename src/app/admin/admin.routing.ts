import { Routes, RouterModule } from '@angular/router';

import { AdminCenterComponent } from './admin-center/admin-center.component';

import { CanActivateIfAdmin } from './can-activate-if-admin.guard';
import { CanActivateIfLogged } from '../guards/can-activate-if-logged.guard';

export const adminRoutes: Routes = [
  {
    path: '', component: AdminCenterComponent,
    canActivate: [CanActivateIfLogged, CanActivateIfAdmin],
    children: [
      { path: '' },
      { path: 'topics',     loadChildren: 'app/admin/topics/topics.module#TopicsModule' },
      { path: 'portals',    loadChildren: 'app/admin/portals/portals.module#PortalsModule' },
      { path: 'organs',     loadChildren: 'app/admin/organs/organs.module#OrgansModule' },
      { path: 'groups',     loadChildren: 'app/admin/groups/groups.module#GroupsModule' },
      { path: 'usergroups', loadChildren: 'app/admin/usergroups/usergroups.module#UsergroupsModule' },
      { path: 'users',      loadChildren: 'app/admin/users/users.module#UsersModule' }
    ]
  }
];

export const adminRouting = RouterModule.forChild(adminRoutes);
