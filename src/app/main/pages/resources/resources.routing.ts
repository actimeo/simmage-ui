import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { ResourceComponent } from './resource-form/resource.component';
import { ResourceResolve } from './resource-resolve.guard';
import {ResourcesCenterComponent} from './resources-center/resources-center.component';
import { ResourcesComponent } from './resources-list/resources.component';
import { ResourcesListResolve } from './resources-list-resolve.guard';

export const resourcesRoutes: Routes = [
   {
      path: '', component:  ResourcesCenterComponent, resolve: { data: ResourcesListResolve },
      children: [ { path: '', component: ResourcesComponent } ]
    },
    {
      path: 'new', component:  ResourcesCenterComponent, resolve: { data: ResourcesListResolve },
      children: [
        {
          path: '',
          component: ResourcesComponent,
        },
        {
          path: '',
          component: ResourceComponent,
          canDeactivate: [CanDeactivateGuard],
          outlet: 'details'
        }
      ]
    },
    {
      path: ':id', component:  ResourcesCenterComponent, resolve: { data: ResourcesListResolve }, children: [
        {
          path: '',
          component: ResourcesComponent,
        },
        {
          path: '',
          component: ResourceComponent,
          resolve: { resource: ResourceResolve },
          canDeactivate: [CanDeactivateGuard],
          outlet: 'details'
        }
      ]
    }
 ];

export const resourcesRouting = RouterModule.forChild(resourcesRoutes);
