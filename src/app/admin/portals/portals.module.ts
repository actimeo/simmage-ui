import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { PortalsComponent } from './portals-center/portals.component';
import { portalsRouting } from './portals.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    portalsRouting,
  ],
  declarations: [PortalsComponent]
})
export class PortalsModule { }
