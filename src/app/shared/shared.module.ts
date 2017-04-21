import { RouterModule } from '@angular/router';
import { DossierGroupedComponent } from './dossier-grouped/dossier-grouped.component';
import { DossierIndividualComponent } from './dossier-individual/dossier-individual.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular/main';

import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { UserRightComponent } from './user-right/user-right.component';
import { SelectParticipantComponent } from './select-participant/select-participant.component';
import { SelectGenericComponent } from './select-generic/select-generic.component';

import { SelectIconComponent, IconDialogComponent } from './select-icon/select-icon.component';
import { SelectColorComponent, ColorDialogComponent } from './select-color/select-color.component';
import { SelectEnumUniqueComponent } from './select-enum-unique/select-enum-unique.component';
import { TopicLabelComponent } from './topic-label/topic-label.component';
import { OrganLabelComponent } from './organ-label/organ-label.component';
import { SelectEnumMultipleComponent } from './select-enum-multiple/select-enum-multiple.component';
import { GenericRightsComponent } from './generic-rights/generic-rights.component';
import { DocumentTypeSelectorComponent } from './document-type-selector/document-type-selector.component';
import { SelectDossierUniqueComponent } from './select-dossier-unique/select-dossier-unique.component';
import { EventTypeSelectorComponent } from './event-type-selector/event-type-selector.component';
import { FormLeaveComponent } from './form-leave/form-leave.component';
import { FrameComponent } from './frame/frame/frame.component';
import { NoteForwardComponent, NoteForwardFormComponent } from './note-forward/note-forward.component';
import { EventCardComponent } from './card-element/event-card/event-card.component';
import { EventsCalendarComponent } from './events-display/events-calendar/events-calendar.component';
import { EventsListComponent } from './events-display/events-list/events-list.component';
import { CalendarModule } from 'angular-calendar';
import { EventsReportComponent } from './events-display/events-report/events-report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    RouterModule,
    CalendarModule
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
    DocumentTypeSelectorComponent,
    SelectDossierUniqueComponent,
    EventTypeSelectorComponent,
    FormLeaveComponent,
    FrameComponent,
    NoteForwardComponent,
    NoteForwardFormComponent,
    EventCardComponent,
    EventsCalendarComponent,
    EventsListComponent,
    EventsReportComponent
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
    DocumentTypeSelectorComponent,
    SelectDossierUniqueComponent,
    EventTypeSelectorComponent,
    FormLeaveComponent,
    FrameComponent,
    NoteForwardComponent,
    NoteForwardFormComponent,
    EventCardComponent,
    EventsCalendarComponent,
    EventsListComponent,
    EventsReportComponent
  ],
  providers: [
  ],
  entryComponents: [
    IconDialogComponent,
    ColorDialogComponent,
    FormLeaveComponent,
    NoteForwardComponent,
    EventCardComponent
  ]
})
export class SharedModule {}
