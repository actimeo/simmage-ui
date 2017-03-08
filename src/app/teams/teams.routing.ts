import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TeamsCenterComponent } from './teams-center/teams-center.component';

import { CanActivateIfLogged } from '../guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from '../guards/can-activate-if-user.guard';

export const teamsRoutes: Routes = [
	{
		path: '', component: TeamsCenterComponent,
		canActivate: [CanActivateIfLogged, CanActivateIfUser]
	}
];

export const teamsRouting = RouterModule.forChild(teamsRoutes);