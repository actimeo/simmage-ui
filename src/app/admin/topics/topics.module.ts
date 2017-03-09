import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MaterialModule } from '@angular/material';
import { topicsRouting } from './topics.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TopicComponent } from './topic/topic.component';
import { TopicsComponent } from './topics-center/topics.component';
import { TopicsListComponent } from './/topics-list/topics-list.component';

import { TopicResolve } from './topic-resolve.guard';
import { TopicListResolve } from './topic-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    topicsRouting,
  ],
  declarations: [
    TopicComponent,
    TopicsComponent,
    TopicsListComponent,
  ],
  providers: [
    TopicResolve,
    TopicListResolve
  ],
  exports: [
  ]
})
export class TopicsModule {
}
