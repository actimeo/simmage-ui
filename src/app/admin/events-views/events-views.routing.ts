import { Routes, RouterModule } from '@angular/router';

import { EventsViewsComponent } from './events-views.component';
/*
import { TopicComponent } from './topic/topic.component';
import { TopicsListComponent } from './topics-list/topics-list.component';

import { TopicResolve } from './topic-resolve.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
*/
export const eventsViewsRoutes: Routes = [
  {
    path: '', component: EventsViewsComponent,
/*    children: [
      { path: '', pathMatch: 'full', component: TopicsListComponent },
      { path: 'new', component: TopicComponent },
      {
        path: ':id', component: TopicComponent,
        resolve: { topic: TopicResolve },
        canDeactivate: [CanDeactivateGuard]
      }
    ]*/
  },
];

export const eventsViewsRouting = RouterModule.forChild(eventsViewsRoutes);
