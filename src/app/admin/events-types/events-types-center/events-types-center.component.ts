import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import '../../../rxjs_operators';

@Component({
  selector: 'app-events-types-center',
  templateUrl: './events-types-center.component.html',
  styleUrls: ['./events-types-center.component.css']
})
export class EventsTypesCenterComponent implements OnInit {

  selectedCat: Observable<string>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedCat = this.route.params.pluck<string>('cat');
  }

}
