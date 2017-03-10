import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { adminRouting } from './admin.routing';

import { CanActivateIfAdmin } from './can-activate-if-admin.guard';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    adminRouting,
  ],
  declarations: [
    SidenavComponent
  ],
  providers: [
    CanActivateIfAdmin,
  ]
})
export class AdminModule {
}
