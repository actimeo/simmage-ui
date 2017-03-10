import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: '/main'
  },
  { path: 'login',        component: LoginComponent },
  { path: 'admin',        loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: 'account',      loadChildren: 'app/account/account.module#AccountModule' },
  { path: 'main',         loadChildren: 'app/main/main.module#MainModule' },
  { path: 'reservations', loadChildren: 'app/reservations/reservations.module#ReservationsModule' }
];

export const routing = RouterModule.forRoot(appRoutes,
  { preloadingStrategy: PreloadAllModules });
