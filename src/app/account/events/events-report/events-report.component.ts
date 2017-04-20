import { Component, OnInit, Input } from '@angular/core';
import { EventJson, TopicJson } from '../../../services/backend/db-models/json';
import { EventsService } from '../../../services/backend/events.service';

interface EventReportJson {
  category: string;
  type: string;
  topics: TopicJson[];
  total_events: number;
  total_hours: number;
  total_days: number;
}

@Component({
  selector: 'app-events-report',
  templateUrl: './events-report.component.html',
  styleUrls: ['./events-report.component.css']
})
export class EventsReportComponent implements OnInit {

  @Input() reports: EventReportJson[];

  constructor(private es: EventsService) { }

  ngOnInit() {
    this.loadReports();
  }

  public loadReports() {
    this.es.loadEventsReportForUser().subscribe(r => this.reports = r);
  }

}
