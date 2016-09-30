import { Component, OnInit } from '@angular/core';

@Component({
  selector: '<%= selector %>-center',
  templateUrl: './<%= dasherizedModuleName %>-center.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>-center.component.<%= styleExt %>']
})
export class <%= classifiedModuleName %>CenterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
