import { RouterModule, Routes } from '@angular/router';

import { CanActivateIfLogged } from '../services/guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from '../services/guards/can-activate-if-user.guard';
import { ModuleWithProviders } from '@angular/core';
import { PartnersCenterComponent } from './partners-center/partners-center.component';

export const partnersRoutes: Routes = [ {
  path: '', component: PartnersCenterComponent,
  canActivate: [CanActivateIfLogged, CanActivateIfUser]
}];

export const partnersRouting = RouterModule.forChild(partnersRoutes);
