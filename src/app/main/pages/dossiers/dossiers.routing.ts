import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../../services/guards/can-deactivate.guard';
import { DossiersComponent } from './dossiers.component';
import { DossiersListResolve } from './dossiers-list-resolve.guard';
import { ModuleWithProviders } from '@angular/core';

export const dossiersRoutes: Routes = [
  {
    path: '', component: DossiersComponent, resolve: { data: DossiersListResolve }
  }
 ];

export const dossiersRouting = RouterModule.forChild(dossiersRoutes);
