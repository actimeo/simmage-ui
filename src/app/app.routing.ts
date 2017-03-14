import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: '/account/dossiers'
  },
  { path: 'login',        component: LoginComponent },
  { path: 'admin',        loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: 'main',         loadChildren: 'app/main/main.module#MainModule' },
  { path: 'account',      loadChildren: 'app/account/account.module#AccountModule' },
  { path: 'contacts',     loadChildren: 'app/contacts/contacts.module#ContactsModule' },
  { path: 'reservations', loadChildren: 'app/reservations/reservations.module#ReservationsModule' },
  { path: 'dossier',      loadChildren: 'app/dossier/dossier.module#DossierModule' }
];

export const routing = RouterModule.forRoot(appRoutes,
  { preloadingStrategy: PreloadAllModules });
