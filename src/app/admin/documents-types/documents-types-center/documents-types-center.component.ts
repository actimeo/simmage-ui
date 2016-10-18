import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import '../../../rxjs_operators';

@Component({
  selector: 'app-documents-types-center',
  templateUrl: './documents-types-center.component.html',
  styleUrls: ['./documents-types-center.component.css']
})
export class DocumentsTypesCenterComponent implements OnInit {

  selectedCat: Observable<string>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedCat = this.route.params.pluck<string>('cat');
  }

}
