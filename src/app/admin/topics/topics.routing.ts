import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TopicsComponent } from './topics-center/topics.component';
import { TopicComponent } from './topic/topic.component';
import { TopicsListComponent } from './topics-list/topics-list.component';

import { TopicResolve } from './topic-resolve.guard';
import { TopicListResolve } from './topic-list-resolve.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';

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
