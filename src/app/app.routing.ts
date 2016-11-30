import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { PageComponent } from './main/page/page.component';

import { CanActivateIfLogged } from './guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from './guards/can-activate-if-user.guard';
import { PagesResolve } from './main/pages/pages-resolve.guard';

const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: '/main'
  },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
  {
    path: 'main', component: MainCenterComponent,
    canActivate: [CanActivateIfLogged, CanActivateIfUser],
    children: [
      { path: '', pathMatch: 'full' },
      {
        path: ':id',
        children: [
          {
            path: '',
            component: PageComponent,
            resolve: { data: PagesResolve }
          }
        ]
      }
    ]
  },

];

export const routing = RouterModule.forRoot(appRoutes,
  { preloadingStrategy: PreloadAllModules });
