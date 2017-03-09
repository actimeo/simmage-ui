import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { EventsTypesCenterComponent } from './events-types-center/events-types-center.component';
import { EventsTypesFormComponent } from './events-types-form/events-types-form.component';
import { EventsTypesListComponent } from './events-types-list/events-types-list.component';
import { EventsTypesListResolve } from './events-types-list-resolve.guard';
import { EventsTypesResolve } from './events-types-resolve.guard';
import { ModuleWithProviders } from '@angular/core';

export const eventsTypesRoutes: Routes = [
  {
    path: '', component: EventsTypesCenterComponent, children: [
      {
        path: '',
        component: EventsTypesListComponent,
        resolve: { list: EventsTypesListResolve }
      }
    ]
  },
  {
    path: 'new', component: EventsTypesCenterComponent, children: [
      {
        path: '',
        component: EventsTypesListComponent,
        resolve: { list: EventsTypesListResolve }
      },
      {
        path: '',
        component: EventsTypesFormComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: EventsTypesCenterComponent, children: [
      {
        path: '',
        component: EventsTypesListComponent,
        resolve: { list: EventsTypesListResolve }
      },
      {
        path: '',
        component: EventsTypesFormComponent,
        resolve: { eventsTypes: EventsTypesResolve },
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },

  {
    path: '', component: EventsTypesCenterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EventsTypesListComponent,
        resolve: { list: EventsTypesListResolve }
      },
      { path: 'new', component: EventsTypesFormComponent },
      {
        path: ':id', component: EventsTypesFormComponent,
        resolve: { eventsTypes: EventsTypesResolve },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];

export const eventsTypesRouting = RouterModule.forChild(eventsTypesRoutes);
