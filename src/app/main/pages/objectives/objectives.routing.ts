import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { ObjectiveComponent } from './objective-form/objective.component';
import { ObjectiveResolve } from './objective-resolve.guard';
import {ObjectivesCenterComponent} from './objectives-center/objectives-center.component';
import { ObjectivesComponent } from './objectives-list/objectives.component';
import { ObjectivesListResolve } from './objectives-list-resolve.guard';

export const objectivesRoutes: Routes = [
   {
      path: '', component:  ObjectivesCenterComponent, resolve: { data: ObjectivesListResolve },
      children: [ { path: '', component: ObjectivesComponent } ]
    },
    {
      path: 'new', component:  ObjectivesCenterComponent, resolve: { data: ObjectivesListResolve },
      children: [
        { path: '', component: ObjectivesComponent },
        {
          path: '',
          component: ObjectiveComponent,
          canDeactivate: [CanDeactivateGuard],
          outlet: 'details'
        }
      ]
    },
    {
      path: ':id', component:  ObjectivesCenterComponent, resolve: { data: ObjectivesListResolve },
      children: [
        { path: '', component: ObjectivesComponent },
        {
          path: '',
          component: ObjectiveComponent,
          resolve: { objective: ObjectiveResolve },
          canDeactivate: [CanDeactivateGuard],
          outlet: 'details'
        }
      ]
    }
 ];

export const objectivesRouting = RouterModule.forChild(objectivesRoutes);
