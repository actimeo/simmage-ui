import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-right',
  templateUrl: './user-right.component.html',
  styleUrls: ['./user-right.component.css']
})
export class UserRightComponent implements OnInit {

  @Input() right: string;

  constructor() { }

  ngOnInit() {
  }

}
