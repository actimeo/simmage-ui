import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { adminRouting } from './admin.routing';

import { CanActivateIfAdmin } from './can-activate-if-admin.guard';
import { AdminCenterComponent } from './admin-center/admin-center.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    adminRouting,
  ],
  declarations: [
    AdminCenterComponent,
    SidenavComponent
  ],
  providers: [
    CanActivateIfAdmin,
  ],
  exports: [
  ]
})
export class AdminModule {
}
