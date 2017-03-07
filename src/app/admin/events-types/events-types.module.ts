import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';
import { CheckboxRendererComponent } from './../../grid/renderers/checkbox';
import { SharedModule } from '../../shared/shared.module';

import { eventsTypesRouting } from './events-types.routing';
import { EventsTypesCenterComponent } from './events-types-center/events-types-center.component';
import { EventsTypesListComponent } from './events-types-list/events-types-list.component';
import { EventsTypesFormComponent } from './events-types-form/events-types-form.component';

import { EventsTypesService } from './events-types.service';
import { EventsTypesResolve } from './events-types-resolve.guard';
import { EventsTypesListResolve } from './events-types-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule.forRoot(),
    eventsTypesRouting,
    AgGridModule
  ],
  declarations: [
    EventsTypesCenterComponent,
    EventsTypesListComponent,
    EventsTypesFormComponent
  ],
  providers: [
    EventsTypesService,
    EventsTypesResolve,
    EventsTypesListResolve
  ]
})
export class EventsTypesModule { }
