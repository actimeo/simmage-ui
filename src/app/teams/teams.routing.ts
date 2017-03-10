import { RouterModule, Routes } from '@angular/router';

import { CanActivateIfLogged } from '../services/guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from '../services/guards/can-activate-if-user.guard';
import { ModuleWithProviders } from '@angular/core';
import { TeamsCenterComponent } from './teams-center/teams-center.component';

export const teamsRoutes: Routes = [{
  path: '', component: TeamsCenterComponent,
  canActivate: [CanActivateIfLogged, CanActivateIfUser]
}];

export const teamsRouting = RouterModule.forChild(teamsRoutes);
