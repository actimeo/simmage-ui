import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/backend/events.service';
import { EventService } from '../../services/backend/event.service';
import { Observable } from 'rxjs/Observable';
import { EventJson } from '../../services/backend/db-models/json';
import { FormsDialogService } from './../../services/utils/forms-dialog.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  private focusedEvent: number;

  private selectedTab: number;

  eventsDisplay: string = 'calendar';

  eventsCreated: EventJson[];
  eventsToAttend: EventJson[];

  constructor(private ess: EventsService, private dialog: FormsDialogService, private es: EventService) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsCreated = [];
    this.eventsToAttend = [];
    this.ess.loadEventsForUser().subscribe(events => {
      this.eventsToAttend = events.filter(e => e.participants ? e.participants.filter(r => r.par_firstname === JSON.parse(localStorage['auth_firstname'])
                                                                    && r.par_lastname === JSON.parse(localStorage['auth_lastname'])).length > 0 : false);
      this.eventsCreated = events.filter(e => e.author.par_firstname === JSON.parse(localStorage['auth_firstname'])
        && e.author.par_lastname === JSON.parse(localStorage['auth_lastname']));
    });
  }

  toggleFocus(id: number) {
    this.focusedEvent = this.focusedEvent !== id ? id : null; 
  }
  
  openEventForm(id = null) {
    this.dialog.openEventForm({ eveId: id }).subscribe(event => {
      if (event) {
        this.loadEvents();
        this.selectedTab = event > 0 ? 1 : this.selectedTab;
        this.focusedEvent = event;
      }
    });
  }

  deleteEvent(id: number) {
    this.es.deleteEvent(id).subscribe(_ => this.loadEvents());
  }

}
