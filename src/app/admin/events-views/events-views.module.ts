import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { eventsViewsRouting } from './events-views.routing';
import { EventsViewsComponent } from './events-views.component';

@NgModule({
  imports: [
    CommonModule,
    eventsViewsRouting
  ],
  declarations: [EventsViewsComponent]
})
export class EventsViewsModule { }
