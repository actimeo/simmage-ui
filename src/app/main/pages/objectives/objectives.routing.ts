import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';

import { ObjectiveComponent } from './objective-form/objective.component';
import { ObjectivesComponent } from './objectives-list/objectives.component';
import { ObjectivesCenterComponent } from './objectives-center/objectives-center.component';

import { ObjectivesListResolve } from './objectives-list-resolve.guard';
import { ObjectiveResolve } from './objective-resolve.guard';

 export const objectivesRoutes: Routes = [
	 {
			path: '', component:  ObjectivesCenterComponent, resolve: { data: ObjectivesListResolve }, children: [
				{
					path: '',
					component: ObjectivesComponent,
					resolve: { data: ObjectivesListResolve }
				}
			]
		},
		{
			path: 'new', component:  ObjectivesCenterComponent, resolve: { data: ObjectivesListResolve }, children: [
				{
					path: '',
					component: ObjectivesComponent,
					resolve: { data: ObjectivesListResolve }
				},
				{
					path: '',
					component: ObjectiveComponent,
					canDeactivate: [CanDeactivateGuard],
					outlet: 'details'
				}
			]
		},
		{
			path: ':id', component:  ObjectivesCenterComponent, resolve: { data: ObjectivesListResolve }, children: [
				{
					path: '',
					component: ObjectivesComponent,
					resolve: { data: ObjectivesListResolve }
				},
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

 export const objectivesRouting = RouterModule.forChild(objectivesRoutes)