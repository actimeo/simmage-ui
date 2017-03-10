import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AppModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './reservations.routing';
import { ReservationsSidenavComponent } from './reservations-sidenav/reservations-sidenav.component';
import { ReservationsMainComponent } from './reservations-main/reservations-main.component';
import { ReservationsUserinfoComponent } from './reservations-userinfo/reservations-userinfo.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    ReservationsSidenavComponent,
    ReservationsMainComponent,
    ReservationsUserinfoComponent
  ]
})
export class ReservationsModule { }
