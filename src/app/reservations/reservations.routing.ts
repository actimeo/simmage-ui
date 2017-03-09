import { RouterModule, Routes } from '@angular/router';

import { CanActivateIfLogged } from '../services/guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from '../services/guards/can-activate-if-user.guard';
import { ModuleWithProviders } from '@angular/core';
import { ReservationsCenterComponent } from './reservations-center/reservations-center.component';

export const reservationsRoutes: Routes = [
	{
		path: '', component: ReservationsCenterComponent,
		canActivate: [CanActivateIfLogged, CanActivateIfUser]
	}
];

export const reservationsRouting = RouterModule.forChild(reservationsRoutes);