import { Routes, RouterModule } from '@angular/router';

import { TopicsComponent } from './topics-center/topics.component';
import { TopicComponent } from './topic/topic.component';
import { TopicsListComponent } from './topics-list/topics-list.component';

import { TopicResolve } from './topic-resolve.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';

export const topicsRoutes: Routes = [
  {
    path: '', component: TopicsComponent, children: [
      { path: '', component: TopicsListComponent }
    ]
  },
  {
    path: 'new', component: TopicsComponent, children: [
      { path: '', component: TopicsListComponent },
      {
        path: '',
        component: TopicComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: TopicsComponent, children: [
      { path: '', component: TopicsListComponent },
      {
        path: '',
        component: TopicComponent,
        resolve: { topic: TopicResolve },
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
];

export const topicsRouting = RouterModule.forChild(topicsRoutes);
