import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';

import { DossiersComponent } from './dossiers.component';
import { DossiersListResolve } from './dossiers-list-resolve.guard';


 export const dossiersRoutes: Routes = [
		{
			path: '', component: DossiersComponent, resolve: { data: DossiersListResolve }
		}
 ];

 export const dossiersRouting = RouterModule.forChild(dossiersRoutes)