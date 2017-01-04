import { DocumentsService } from './shared/documents.service';
import { CheckboxRendererComponent } from './grid/renderers/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AgGridModule } from 'ag-grid-ng2/main';

import { SharedModule } from './shared/shared.module';

import { MaterialModule } from '@angular/material';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { PgService } from './pg.service';
import { UserService } from './user.service';
import { DossiersService } from './dossiers.service';
import { DeviceService } from './device.service';
import { SnackService } from './snack.service';
import { PortalsService } from './portals.service';
import { PagesResolve } from './main/pages/pages-resolve.guard';

import { CanActivateIfLogged } from './guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from './guards/can-activate-if-user.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

@NgModule({
  declarations: [
    // app
    AppComponent,
    LoginComponent,
    // main part
    CheckboxRendererComponent,
    // Guards
    // .
  ],
  imports: [
    // ng2
    BrowserModule,
    // CommonModule,
    // ng2 modules
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule.forRoot(),
    // app
    routing,
    SharedModule.forRoot(),
    AgGridModule.withComponents([
      CheckboxRendererComponent
    ])
    // .
  ],
  providers: [
    PgService,
    UserService,
    DossiersService,
    DeviceService,
    SnackService,
    PortalsService,
    CanActivateIfLogged,
    CanActivateIfUser,
    CanDeactivateGuard,
    CanDeactivateGuard,
    PagesResolve,
    DocumentsService
  ],
  exports: [
    AgGridModule
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
