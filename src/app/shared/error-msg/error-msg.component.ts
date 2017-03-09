import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  @Input() msg;
  @Input() details;

  detailsVisible = false;

  constructor() { }

  ngOnInit() {
  }

  toggleDetails() {
    this.detailsVisible = !this.detailsVisible;
  }
}
