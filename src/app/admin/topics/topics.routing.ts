import { Routes, RouterModule } from '@angular/router';

import { TopicsComponent } from './topics-center/topics.component';
import { TopicComponent } from './topic/topic.component';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { Test1Component } from './test1/test1.component';

import { TopicResolve } from '../topic-resolve.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';

export const topicsRoutes: Routes = [
  {
    path: '', component: TopicsComponent,
    children: [
      { path: '', pathMatch: 'full', component: TopicsListComponent },
      { path: 'test', component: Test1Component },
      { path: 'new', component: TopicComponent },
      {
        path: ':id', component: TopicComponent,
        resolve: { topic: TopicResolve },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];

export const topicsRouting = RouterModule.forChild(topicsRoutes);
