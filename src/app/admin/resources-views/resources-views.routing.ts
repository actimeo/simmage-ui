import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { ResourcesViewsCenterComponent } from './resources-views-center/resources-views-center.component';
import { ResourcesViewsFormComponent } from './resources-views-form/resources-views-form.component';
import { ResourcesViewsListComponent } from './resources-views-list/resources-views-list.component';
import { ResourcesViewsListResolve } from './resources-views-list-resolve.guard';
import { ResourcesViewsResolve } from './resources-views-resolve.guard';

export const resourcesViewsRoutes: Routes = [
  {
    path: '', component: ResourcesViewsCenterComponent, children: [
      {
        path: '',
        component: ResourcesViewsListComponent,
        resolve: { list: ResourcesViewsListResolve }
      }
    ]
  },
  {
    path: 'new', component: ResourcesViewsCenterComponent, children: [
      {
        path: '',
        component: ResourcesViewsListComponent,
        resolve: { list: ResourcesViewsListResolve }
      },
      {
        path: '',
        component: ResourcesViewsFormComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: ResourcesViewsCenterComponent, children: [
      {
        path: '',
        component: ResourcesViewsListComponent,
        resolve: { list: ResourcesViewsListResolve }
      },
      {
        path: '',
        component: ResourcesViewsFormComponent,
        resolve: { resourcesViews: ResourcesViewsResolve },
  canDeactivate: [CanDeactivateGuard],
  outlet: 'details'
      }
]
  }
];

export const resourcesViewsRouting = RouterModule.forChild(resourcesViewsRoutes);
