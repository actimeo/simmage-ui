import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared.module';

import { DocumentComponent } from './document/document.component';
import { EventComponent } from './event/event.component';
import { ObjectiveComponent } from './objective/objective.component';
import { NoteComponent } from './note/note.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		SharedModule
	],
	exports: [
		CommonModule,
		FormsModule,

		DocumentComponent,
		EventComponent,
		NoteComponent,
		ObjectiveComponent
	],
	declarations: [
		DocumentComponent,
		EventComponent,
		NoteComponent,
		ObjectiveComponent
	],
	providers: [],
	entryComponents: [
		DocumentComponent,
		EventComponent,
		NoteComponent,
		ObjectiveComponent
	]
})
export class FormsDialogModule {}