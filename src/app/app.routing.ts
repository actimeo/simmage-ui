import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { PageComponent } from './main/page/page.component';

import { CanActivateIfLogged } from './guards/can-activate-if-logged.guard';

import { adminRoutes } from './admin/admin.routing';

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
  ...adminRoutes
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
