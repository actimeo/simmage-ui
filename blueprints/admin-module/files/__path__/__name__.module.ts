import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { <%= camelizedModuleName %>Routing } from './<%= dasherizedModuleName %>.routing';

@NgModule({
  imports: [
    CommonModule,
    <%= camelizedModuleName %>Routing
  ],
  declarations: []
})
export class <%= classifiedModuleName %>Module { }
