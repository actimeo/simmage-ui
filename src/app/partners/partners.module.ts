import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { partnersRouting } from './partners.routing';
import { SharedModule } from '../shared/shared.module';

import { PartnersCenterComponent } from './partners-center/partners-center.component';
import { PartnersSidenavComponent } from './partners-sidenav/partners-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    partnersRouting,
    SharedModule.forRoot()
  ],
  declarations: [PartnersCenterComponent, PartnersSidenavComponent]
})
export class PartnersModule { }
