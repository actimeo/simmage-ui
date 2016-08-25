import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminCenterComponent } from './admin/admin-center/admin-center.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { TopicsComponent } from './admin/topics/topics.component';
import { OrgansComponent } from './admin/organs/organs.component';
import { UsergroupsComponent } from './admin/usergroups/usergroups.component';
import { UsersComponent } from './admin/users/users.component';
import { CanActivateIfLogged } from './guards/can-activate-if-logged.guard';

const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full',
    canActivate: [CanActivateIfLogged],
    component: MainCenterComponent
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [CanActivateIfLogged],
    component: AdminCenterComponent,
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
