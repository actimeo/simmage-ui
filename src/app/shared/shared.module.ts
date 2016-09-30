import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { UserRightComponent } from './user-right/user-right.component';
import { SelectParticipantComponent } from './select-participant/select-participant.component';
import { SelectGenericComponent } from './select-generic/select-generic.component';

import { UserService } from './user.service';
import { PortalsService } from './portals.service';
import { ParticipantsService } from './participants.service';

import { SelectIconComponent, IconDialogComponent } from './select-icon/select-icon.component';
import { SelectColorComponent, ColorDialogComponent } from './select-color/select-color.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ErrorMsgComponent,
    UserRightComponent,
    SelectParticipantComponent,
    SelectGenericComponent,
    SelectIconComponent,
    SelectColorComponent
  ],
  declarations: [
    ErrorMsgComponent,
    UserRightComponent,
    SelectParticipantComponent,
    SelectGenericComponent,
    SelectIconComponent,
    IconDialogComponent,
    SelectColorComponent,
    ColorDialogComponent
  ],
  providers: [
  ],
  entryComponents: [
    IconDialogComponent,
    ColorDialogComponent
    ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UserService, ParticipantsService, PortalsService]
    };
  }
}
