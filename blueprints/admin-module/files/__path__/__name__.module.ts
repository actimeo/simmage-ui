import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { <%= camelizedModuleName %>Routing } from './<%= dasherizedModuleName %>.routing';
import { <%= classifiedModuleName %>CenterComponent } from './<%= dasherizedModuleName %>-center/<%= dasherizedModuleName %>-center.component';
import { <%= classifiedModuleName %>ListComponent } from './<%= dasherizedModuleName %>-list/<%= dasherizedModuleName %>-list.component';
import { <%= classifiedModuleName %>FormComponent } from './<%= dasherizedModuleName %>-form/<%= dasherizedModuleName %>-form.component';

import { <%= classifiedModuleName %>Service } from './<%= dasherizedModuleName %>.service';
import { <%= classifiedModuleName %>Resolve } from './<%= dasherizedModuleName %>-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule.forRoot(),
    <%= camelizedModuleName %>Routing
  ],
  declarations: [
    <%= classifiedModuleName %>CenterComponent,
    <%= classifiedModuleName %>ListComponent,
    <%= classifiedModuleName %>FormComponent
  ],
  providers: [
    <%= classifiedModuleName %>Service,
    <%= classifiedModuleName %>Resolve
  ]
})
export class <%= classifiedModuleName %>Module { }
