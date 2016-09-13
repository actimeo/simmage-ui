import { Routes } from '@angular/router';

import { TopicsComponent } from './topics-center/topics.component';
import { TopicComponent } from './topic/topic.component';
import { TopicsListComponent } from './topics-list/topics-list.component';

import { TopicResolve } from '../topic-resolve.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';

export const topicsRoutes: Routes = [
  {
    path: 'topics', component: TopicsComponent,
    children: [
      { path: '', pathMatch: 'full', component: TopicsListComponent },
      { path: 'new', component: TopicComponent },
      {
        path: ':id', component: TopicComponent,
        resolve: { topic: TopicResolve },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];
