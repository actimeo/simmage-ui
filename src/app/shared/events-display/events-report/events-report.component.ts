import { Component, OnChanges, Input } from '@angular/core';
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
export class EventsReportComponent implements OnChanges {

  @Input() userReports: boolean = false;
  @Input() view: number;
  @Input() group: number;
  reports: EventReportJson[];

  constructor(private es: EventsService) { }

  ngOnChanges() {
    this.loadReports();
  }

  private loadUserReports() {
    this.es.loadEventsReportForUser().subscribe(r => this.reports = r);
  }

  private loadEventsViewReports() {
    this.es.loadEventsViewReport(this.view, this.group).subscribe(r => this.reports = r);
  }

  public loadReports() {
    if (this.userReports) {
      this.loadUserReports();
    } else {
      this.loadEventsViewReports();
    }
  }

}
