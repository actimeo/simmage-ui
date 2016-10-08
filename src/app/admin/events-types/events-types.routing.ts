import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { EventsTypesCenterComponent } from './events-types-center/events-types-center.component';
import { EventsTypesListComponent } from './events-types-list/events-types-list.component';
import { EventsTypesFormComponent } from './events-types-form/events-types-form.component';
import { EventsTypesResolve } from './events-types-resolve.guard';

export const eventsTypesRoutes: Routes = [
  {
    path: '', component: EventsTypesCenterComponent, children: [
      { path: '', component: EventsTypesListComponent }
    ]
  },
  {
    path: 'new', component: EventsTypesCenterComponent, children: [
      { path: '', component: EventsTypesListComponent },
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
      { path: '', component: EventsTypesListComponent },
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
      { path: '', pathMatch: 'full', component: EventsTypesListComponent },
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
