import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { UserRightComponent } from './user-right/user-right.component';
import { SelectParticipantComponent } from './select-participant/select-participant.component';

import { UserService } from './user.service';
import { ParticipantsService } from './participants.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule, FormsModule, ErrorMsgComponent, UserRightComponent, SelectParticipantComponent
  ],
  declarations: [ErrorMsgComponent, UserRightComponent, SelectParticipantComponent],
  providers: [
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UserService, ParticipantsService]
    };
  }
}
