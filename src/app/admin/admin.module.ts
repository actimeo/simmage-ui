import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdIconModule, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdListModule } from '@angular2-material/list/list';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';
import { MdSidenavModule } from '@angular2-material/sidenav/sidenav';

import { adminRouting } from './admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CanActivateIfAdmin } from './can-activate-if-admin.guard';
import { AdminCenterComponent } from './admin-center/admin-center.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MdIconModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,

    adminRouting,
  ],
  declarations: [
    AdminCenterComponent,
    SidenavComponent
  ],
  providers: [
    MdIconRegistry,
    CanActivateIfAdmin,
  ],
  exports: [
  ]
})
export class AdminModule {
}
