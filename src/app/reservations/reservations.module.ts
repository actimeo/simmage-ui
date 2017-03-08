import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { reservationsRouting } from './reservations.routing';
import { SharedModule } from '../shared/shared.module';

import { ReservationsCenterComponent } from './reservations-center/reservations-center.component';
import { ReservationsSidenavComponent } from './reservations-sidenav/reservations-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    reservationsRouting,
    MaterialModule,
    SharedModule.forRoot()
  ],
  declarations: [ReservationsCenterComponent, ReservationsSidenavComponent]
})
export class ReservationsModule { }
