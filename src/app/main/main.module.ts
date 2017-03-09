import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { mainRouting } from './main.routing';

import { SharedModule } from '../shared/shared.module';

import { MainCenterComponent } from './main-center/main-center.component';
import { MainSidenavComponent } from './main-sidenav/main-sidenav.component';

import { PageComponent } from './page/page.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    mainRouting,
    SharedModule
  ],
  declarations: [
    MainCenterComponent,
    MainSidenavComponent,
    PageComponent,
    UserinfoComponent
  ]
})
export class MainModule {
}
