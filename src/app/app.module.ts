import { SwitchthemeService } from './services/utils/switchtheme.service';
import { PortalsService } from './services/backend/portals.service';
import { SnackService } from './services/utils/snack.service';
import { DeviceService } from './services/utils/device.service';
import { DossiersService } from './services/backend/dossiers.service';
import { UserService } from './services/utils/user.service';
import { PgService } from './services/backend/pg.service';
import { DocumentsService } from './shared/documents.service';
import { CheckboxRendererComponent } from './grid/renderers/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AgGridModule } from 'ag-grid-angular/main';

import { SharedModule } from './shared/shared.module';

import { MaterialModule } from '@angular/material';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

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
    CheckboxRendererComponent
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
    DocumentsService,
    SwitchthemeService
  ],
  exports: [
    AgGridModule
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
