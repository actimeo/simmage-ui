import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { ObjectiveResolve } from './objective-resolve.guard';
import {ObjectivesCenterComponent} from './objectives-center/objectives-center.component';
import { ObjectivesComponent } from './objectives-list/objectives.component';
import { ObjectivesListResolve } from './objectives-list-resolve.guard';

export const objectivesRoutes: Routes = [
   {
      path: '', component:  ObjectivesCenterComponent, resolve: { data: ObjectivesListResolve },
      children: [ { path: '', component: ObjectivesComponent } ]
    }
 ];

export const objectivesRouting = RouterModule.forChild(objectivesRoutes);
