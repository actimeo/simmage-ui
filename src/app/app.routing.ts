import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminCenterComponent } from './admin/admin-center/admin-center.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { TopicsComponent } from './admin/topics/topics.component';
import { OrgansComponent } from './admin/organs/organs.component';
import { UsergroupsComponent } from './admin/usergroups/usergroups.component';
import { UsersComponent } from './admin/users/users.component';
import { PageComponent } from './main/page/page.component';

import { CanActivateIfLogged } from './guards/can-activate-if-logged.guard';
import { CanActivateIfAdmin } from './guards/can-activate-if-admin.guard';

const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: '/main',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainCenterComponent,
    canActivate: [CanActivateIfLogged],
    children: [
      { path: '', pathMatch: 'full' },
      { path: ':id', component: PageComponent }
    ]
  },
  {
    path: 'admin', component: AdminCenterComponent,
    canActivate: [CanActivateIfLogged, CanActivateIfAdmin],
    children: [
      { path: '' },
      { path: 'topics', component: TopicsComponent },
      { path: 'organs', component: OrgansComponent },
      { path: 'usergroups', component: UsergroupsComponent },
      { path: 'users', component: UsersComponent },
    ]
  }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
