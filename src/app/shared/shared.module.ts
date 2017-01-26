import { DossierGroupedComponent } from './dossier-grouped/dossier-grouped.component';
import { DossierIndividualComponent } from './dossier-individual/dossier-individual.component';
import { ObjectivesService } from './objectives.service';
import { ResourcesService } from './resources.service';
import { NotesService } from './notes.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-ng2/main';

import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { UserRightComponent } from './user-right/user-right.component';
import { SelectParticipantComponent } from './select-participant/select-participant.component';
import { SelectGenericComponent } from './select-generic/select-generic.component';

import { PreferencesService } from './preferences.service';
import { ParticipantsService } from './participants.service';
import { EnumsService } from './enums.service';
import { TopicService } from './topic.service';
import { OrganService } from './organ.service';
import { EventsService } from './events.service';
import { DocumentsService } from './documents.service';

import { SelectIconComponent, IconDialogComponent } from './select-icon/select-icon.component';
import { SelectColorComponent, ColorDialogComponent } from './select-color/select-color.component';
import { SelectEnumUniqueComponent } from './select-enum-unique/select-enum-unique.component';
import { TopicLabelComponent } from './topic-label/topic-label.component';
import { OrganLabelComponent } from './organ-label/organ-label.component';
import { SelectEnumMultipleComponent } from './select-enum-multiple/select-enum-multiple.component';
import { GenericRightsComponent } from './generic-rights/generic-rights.component';
import { DocumentTypeSelectorComponent } from './document-type-selector/document-type-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule
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
    SelectEnumMultipleComponent,
    GenericRightsComponent,
    DossierIndividualComponent,
    DossierGroupedComponent,
    DocumentTypeSelectorComponent
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
    OrganLabelComponent,
    SelectEnumMultipleComponent,
    GenericRightsComponent,
    DossierIndividualComponent,
    DossierGroupedComponent,
    DocumentTypeSelectorComponent

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
        EnumsService,
        TopicService,
        OrganService,
        EventsService,
        DocumentsService,
        NotesService,
        ResourcesService,
        ObjectivesService,
        PreferencesService
      ]
    };
  }
}
