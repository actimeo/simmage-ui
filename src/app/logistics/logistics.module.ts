import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AppModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './logistics.routing';
import { LogisticsMainComponent } from './logistics-main/logistics-main.component';
import { LogisticsSidenavComponent } from './logistics-sidenav/logistics-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    LogisticsMainComponent,
    LogisticsSidenavComponent
  ]
})
export class LogisticsModule { }
