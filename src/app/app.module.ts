import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { AdminCenterComponent } from './admin/admin-center/admin-center.component';
import { MainCenterComponent } from './main/main-center/main-center.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminCenterComponent,
    MainCenterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    routing
  ],
  providers: [appRoutingProviders],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
