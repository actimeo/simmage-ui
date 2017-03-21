import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

import { eventsRouting } from './events.routing';
import { EventsCenterComponent } from './events-center/events-center.component';
import { EventsComponent } from './events-list/events.component';

import { EventResolve } from './event-resolve.guard';
import { EventsListResolve } from './events-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    eventsRouting
  ],
  declarations: [
    EventsCenterComponent,
    EventsComponent
  ],
  providers: [
    EventResolve,
    EventsListResolve
  ]
})
export class EventsModule { }
