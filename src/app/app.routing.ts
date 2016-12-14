import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

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
  { path: 'login',  component: LoginComponent },
  { path: 'admin',  loadChildren: 'app/admin/admin.module#AdminModule'  },
  { path: 'main',   loadChildren: 'app/main/main.module#MainModule'     },
];

export const routing = RouterModule.forRoot(appRoutes,
  { preloadingStrategy: PreloadAllModules });
