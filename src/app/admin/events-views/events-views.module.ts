import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { eventsViewsRouting } from './events-views.routing';
import { EventsViewsCenterComponent } from './events-views-center/events-views-center.component';
import { EventsViewsListComponent } from './events-views-list/events-views-list.component';
import { EventsViewsFormComponent } from './events-views-form/events-views-form.component';

import { EventsViewsService } from './events-views.service';
import { EventsViewsResolve } from './events-views-resolve.guard';
import { EventsViewsListResolve } from './events-views-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    eventsViewsRouting
  ],
  declarations: [
    EventsViewsCenterComponent,
    EventsViewsListComponent,
    EventsViewsFormComponent
  ],
  providers: [
    EventsViewsService,
    EventsViewsResolve,
    EventsViewsListResolve
  ]
})
export class EventsViewsModule { }
