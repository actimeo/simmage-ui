import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

import { eventsRouting } from './events.routing';
import { EventComponent } from './event-form/event.component';
import { EventsCenterComponent } from './events-center/events-center.component';
import { EventsComponent } from './events-list/events.component';

import { EventService } from './event.service';
import { EventResolve } from './event-resolve.guard';
import { EventsListResolve } from './events-list-resolve.guard'; 

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		SharedModule.forRoot(),
		eventsRouting
	],
	declarations: [
		EventComponent,
		EventsCenterComponent,
		EventsComponent
	],
	providers: [
		EventService,
		EventResolve,
		EventsListResolve
	]
})
export class EventsModule { }
