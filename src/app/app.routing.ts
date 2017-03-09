import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CanActivateIfLogged } from './services/guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from './services/guards/can-activate-if-user.guard';
import { LoginComponent } from './login/login.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { ModuleWithProviders } from '@angular/core';
import { PageComponent } from './main/page/page.component';
import { PagesResolve } from './main/pages/pages-resolve.guard';

const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: '/main'
  },
  { path: 'login',        component: LoginComponent },
  { path: 'admin',        loadChildren: 'app/admin/admin.module#AdminModule'                        },
  { path: 'account',      loadChildren: 'app/account/account.module#AccountModule'                  },
  { path: 'main',         loadChildren: 'app/main/main.module#MainModule'                           },
  { path: 'teams',        loadChildren: 'app/teams/teams.module#TeamsModule'                        },
  { path: 'reservations', loadChildren: 'app/reservations/reservations.module#ReservationsModule'   },
  { path: 'partners',     loadChildren: 'app/partners/partners.module#PartnersModule'               }
];

export const routing = RouterModule.forRoot(appRoutes,
  { preloadingStrategy: PreloadAllModules });
