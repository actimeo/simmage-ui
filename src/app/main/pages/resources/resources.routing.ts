import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';

import { ResourceComponent } from './resource-form/resource.component';
import { ResourcesComponent } from './resources-list/resources.component';
import { ResourcesCenterComponent } from './resources-center/resources-center.component';

import { ResourcesListResolve } from './resources-list-resolve.guard';
import { ResourceResolve } from './resource-resolve.guard';

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

 export const resourcesRouting = RouterModule.forChild(resourcesRoutes)