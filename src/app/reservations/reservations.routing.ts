import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ReservationsCenterComponent } from './reservations-center/reservations-center.component';

import { CanActivateIfLogged } from '../guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from '../guards/can-activate-if-user.guard';

export const reservationsRoutes: Routes = [
	{
		path: '', component: ReservationsCenterComponent,
		canActivate: [CanActivateIfLogged, CanActivateIfUser]
	}
];

export const reservationsRouting = RouterModule.forChild(reservationsRoutes);