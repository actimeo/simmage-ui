import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdButtonModule } from '@angular2-material/button/button';
import { MdCardModule } from '@angular2-material/card/card';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdInputModule } from '@angular2-material/input/input';
import { MdListModule } from '@angular2-material/list/list';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';

import { topicsRouting } from './topics.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TopicComponent } from './topic/topic.component';
import { TopicsComponent } from './topics-center/topics.component';
import { TopicsListComponent } from './/topics-list/topics-list.component';

import { ErrorMsgComponent } from '../../common/error-msg/error-msg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdToolbarModule,
    MdListModule,
    MdIconModule,

    topicsRouting,
  ],
  declarations: [
    TopicComponent,
    TopicsComponent,
    TopicsListComponent,
    ErrorMsgComponent
  ],
  providers: [
    MdIconRegistry,
  ],
  exports: [
    ErrorMsgComponent
  ]
})
export class TopicsModule {
}
