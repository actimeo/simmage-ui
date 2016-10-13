import { Component, Input, OnInit } from '@angular/core';

import { DbTopic } from '../../db-models/organ';

@Component({
  selector: 'app-topic-label',
  templateUrl: './topic-label.component.html',
  styleUrls: ['./topic-label.component.css']
})
export class TopicLabelComponent implements OnInit {

  @Input() topic: DbTopic;

  constructor() { }

  ngOnInit() {
  }

}
