import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalsComponent } from './portals-center/portals.component';

import { portalsRouting } from './portals.routing';

@NgModule({
  imports: [
    CommonModule,
    portalsRouting,
  ],
  declarations: [PortalsComponent]
})
export class PortalsModule { }
