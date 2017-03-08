import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PartnersCenterComponent } from './partners-center/partners-center.component';

import { CanActivateIfLogged } from '../guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from '../guards/can-activate-if-user.guard';

export const partnersRoutes: Routes = [
	{
		path: '', component: PartnersCenterComponent,
		canActivate: [CanActivateIfLogged, CanActivateIfUser]
	}
];

export const partnersRouting = RouterModule.forChild(partnersRoutes);