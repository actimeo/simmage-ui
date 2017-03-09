import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { ObjectivesViewsCenterComponent } from './objectives-views-center/objectives-views-center.component';
import { ObjectivesViewsFormComponent } from './objectives-views-form/objectives-views-form.component';
import { ObjectivesViewsListComponent } from './objectives-views-list/objectives-views-list.component';
import { ObjectivesViewsListResolve } from './objectives-views-list-resolve.guard';
import { ObjectivesViewsResolve } from './objectives-views-resolve.guard';

export const objectivesViewsRoutes: Routes = [
  {
    path: '', component: ObjectivesViewsCenterComponent, children: [
      {
        path: '',
        component: ObjectivesViewsListComponent,
        resolve: { list: ObjectivesViewsListResolve }
      }
    ]
  },
  {
    path: 'new', component: ObjectivesViewsCenterComponent, children: [
      {
        path: '',
        component: ObjectivesViewsListComponent,
        resolve: { list: ObjectivesViewsListResolve }
      },
      {
        path: '',
        component: ObjectivesViewsFormComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: ObjectivesViewsCenterComponent, children: [
      {
        path: '',
        component: ObjectivesViewsListComponent,
        resolve: { list: ObjectivesViewsListResolve }
      },
      {
        path: '',
        component: ObjectivesViewsFormComponent,
        resolve: { objectivesViews: ObjectivesViewsResolve },
  canDeactivate: [CanDeactivateGuard],
  outlet: 'details'
      }
]
  }
];

export const objectivesViewsRouting = RouterModule.forChild(objectivesViewsRoutes);
