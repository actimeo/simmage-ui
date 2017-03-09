import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgModule, OpaqueToken } from '@angular/core';

import { AgGridModule } from 'ag-grid-angular/main';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CanActivateIfLogged } from './services/guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from './services/guards/can-activate-if-user.guard';
import { CanDeactivateGuard } from './services/guards/can-deactivate.guard';
import { CheckboxRendererComponent } from './grid/renderers/checkbox';
import { DeviceService } from './services/utils/device.service';
import { DocumentsService } from './services/backend/documents.service';
import { DossiersService } from './services/backend/dossiers.service';
import { EnumsService } from './services/backend/enums.service';
import { EventsService } from './services/backend/events.service';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '@angular/material';
import { NoteService } from './services/backend/note.service';
import { NotesService } from './services/backend/notes.service';
import { ObjectivesService } from './services/backend/objectives.service';
import { OrganService } from './services/backend/organ.service';
import { PagesResolve } from './main/pages/pages-resolve.guard';
import { ParticipantsService } from './services/backend/participants.service';
import { PgService } from './services/backend/pg.service';
import { PortalsService } from './services/backend/portals.service';
import { PreferencesService } from './services/utils/preferences.service';
import { ResourcesService } from './services/backend/resources.service';
import { SharedModule } from './shared/shared.module';
import { SnackService } from './services/utils/snack.service';
import { SwitchthemeService } from './services/utils/switchtheme.service';
import { TopicService } from './services/backend/topic.service';
import { UserService } from './services/utils/user.service';
import { FormLeaveDialogService } from './services/utils/form-leave-dialog.service';
import { FormsDialogService } from './services/utils/forms-dialog.service';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CheckboxRendererComponent
  ],
  imports: [
    // ng
    BrowserModule,
    // CommonModule,
    // ng modules
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    // app
    routing,
    SharedModule,
    AgGridModule.withComponents([
      CheckboxRendererComponent
    ])
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
    SwitchthemeService,
    ParticipantsService,
    EnumsService,
    TopicService,
    OrganService,
    EventsService,
    DocumentsService,
    NoteService,
    NotesService,
    ResourcesService,
    ObjectivesService,
    PreferencesService,
    FormLeaveDialogService,
    FormsDialogService
  ],
  exports: [
    AgGridModule
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
