import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { TopicComponent } from './topic/topic.component';
import { TopicListResolve } from './topic-list-resolve.guard';
import { TopicResolve } from './topic-resolve.guard';
import { TopicsComponent } from './topics-center/topics.component';
import { TopicsListComponent } from './topics-list/topics-list.component';

export const topicsRoutes: Routes = [
  {
    path: '', component: TopicsComponent, children: [
      {
        path: '', component: TopicsListComponent,
        resolve: { list: TopicListResolve }
      }
    ]
  },
  {
    path: 'new', component: TopicsComponent, children: [
      {
        path: '', component: TopicsListComponent,
        resolve: { list: TopicListResolve }
      },
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
      {
        path: '', component: TopicsListComponent,
        resolve: { list: TopicListResolve }
      },
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
