import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { mainRouting } from './main.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { MainSidenavComponent } from './main-sidenav/main-sidenav.component';

import { PageComponent } from './page/page.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

import { DocumentsComponent } from './pages/documents/documents.component';
import { DocumentsListResolve } from './pages/documents/documents-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    mainRouting,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MainSidenavComponent,
    PageComponent,
    UserinfoComponent,
    DocumentsComponent
  ],
  providers: [
    DocumentsListResolve
  ]
})
export class MainModule {
}
