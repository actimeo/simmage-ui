import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AppModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './logistics.routing';
import { LogisticsSidenavComponent } from './logistics-sidenav/logistics-sidenav.component';
import { OccupancyComponent } from './occupancy/occupancy.component';
import { ReservationsComponent } from './reservations/reservations.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    routing
  ],
  declarations: [
    LogisticsSidenavComponent,
    OccupancyComponent,
    ReservationsComponent
  ]
})
export class LogisticsModule { }
