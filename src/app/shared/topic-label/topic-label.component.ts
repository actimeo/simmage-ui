import { Component, Input, OnInit } from '@angular/core';

import { DbTopic } from '../../services/backend/db-models/organ';

@Component({
  selector: 'app-topic-label',
  templateUrl: './topic-label.component.html',
  styleUrls: ['./topic-label.component.css']
})
export class TopicLabelComponent implements OnInit {

  @Input() topic: DbTopic;
  @Input() noText: boolean = false;

  constructor() { }

  ngOnInit() {
  }
}
