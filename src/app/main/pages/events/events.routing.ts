import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../../services/guards/can-deactivate.guard';
import { EventComponent } from './event-form/event.component';
import { EventResolve } from './event-resolve.guard';
import {EventsCenterComponent} from './events-center/events-center.component';
import { EventsComponent } from './events-list/events.component';
import { EventsListResolve } from './events-list-resolve.guard';
import { ModuleWithProviders } from '@angular/core';

export const eventsRoutes: Routes = [
	 {
			path: '', component:  EventsCenterComponent, resolve: { data: EventsListResolve }, 
			children: [ { path: '', component: EventsComponent } ]
		},
		{
			path: 'new', component:  EventsCenterComponent, resolve: { data: EventsListResolve }, 
			children: [
				{
					path: '',
					component: EventsComponent
				},
				{
					path: '',
					component: EventComponent,
					canDeactivate: [CanDeactivateGuard],
					outlet: 'details'
				}
			]
		},
		{
			path: ':id', component:  EventsCenterComponent, resolve: { data: EventsListResolve }, children: [
				{ path: '', component: EventsComponent },
				{
					path: '',
					component: EventComponent,
					resolve: { event: EventResolve },
					canDeactivate: [CanDeactivateGuard],
					outlet: 'details'
				}
			]
		}
 ];

 export const eventsRouting = RouterModule.forChild(eventsRoutes)