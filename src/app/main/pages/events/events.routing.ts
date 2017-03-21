import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../../services/guards/can-deactivate.guard';
import { EventResolve } from './event-resolve.guard';
import {EventsCenterComponent} from './events-center/events-center.component';
import { EventsComponent } from './events-list/events.component';
import { EventsListResolve } from './events-list-resolve.guard';
import { ModuleWithProviders } from '@angular/core';

export const eventsRoutes: Routes = [
   {
      path: '', component:  EventsCenterComponent, resolve: { data: EventsListResolve },
      children: [ { path: '', component: EventsComponent } ]
    }
 ];

export const eventsRouting = RouterModule.forChild(eventsRoutes);
