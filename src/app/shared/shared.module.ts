import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { UserRightComponent } from './user-right/user-right.component';
import { SelectParticipantComponent } from './select-participant/select-participant.component';
import { SelectGenericComponent } from './select-generic/select-generic.component';

import { PreferencesService } from './preferences.service';
import { PortalsService } from './portals.service';
import { ParticipantsService } from './participants.service';
import { EnumsService } from './enums.service';
import { TopicService } from './topic.service';
import { OrganService } from './organ.service';

import { SelectIconComponent, IconDialogComponent } from './select-icon/select-icon.component';
import { SelectColorComponent, ColorDialogComponent } from './select-color/select-color.component';
import { SelectEnumUniqueComponent } from './select-enum-unique/select-enum-unique.component';
import { TopicLabelComponent } from './topic-label/topic-label.component';
import { OrganLabelComponent } from './organ-label/organ-label.component';

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
    SelectColorComponent,
    SelectEnumUniqueComponent,
    TopicLabelComponent,
    OrganLabelComponent,
  ],
  declarations: [
    ColorDialogComponent,
    IconDialogComponent,

    ErrorMsgComponent,
    UserRightComponent,
    SelectParticipantComponent,
    SelectGenericComponent,
    SelectIconComponent,
    SelectColorComponent,
    SelectEnumUniqueComponent,
    TopicLabelComponent,
    OrganLabelComponent
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
      providers: [
        ParticipantsService,
        PortalsService,
        EnumsService,
        TopicService,
        OrganService,
        PreferencesService
      ]
    };
  }
}
