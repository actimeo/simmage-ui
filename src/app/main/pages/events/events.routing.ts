import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';

import { EventComponent } from './event-form/event.component';
import { EventsComponent } from './events-list/events.component';
import { EventsCenterComponent } from './events-center/events-center.component';

import { EventsListResolve } from './events-list-resolve.guard';
import { EventResolve } from './event-resolve.guard';

 export const eventsRoutes: Routes = [
	 {
			path: '', component:  EventsCenterComponent, resolve: { data: EventsListResolve }, children: [
				{
					path: '',
					component: EventsComponent,
					resolve: { data: EventsListResolve }
				}
			]
		},
		{
			path: 'new', component:  EventsCenterComponent, resolve: { data: EventsListResolve }, children: [
				{
					path: '',
					component: EventsComponent,
					resolve: { data: EventsListResolve }
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
				{
					path: '',
					component: EventsComponent,
					resolve: { data: EventsListResolve }
				},
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