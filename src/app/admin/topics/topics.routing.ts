import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicsComponent } from '../../admin/topics/topics-center/topics.component';
import { TopicComponent } from '../../admin/topics/topic/topic.component';
import { TopicsListComponent } from '../../admin/topics/topics-list/topics-list.component';
import { TopicResolve } from '../../admin/topic-resolve.guard';
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

//export const topicsRouting: ModuleWithProviders = RouterModule.forChild(topicsRoutes);
