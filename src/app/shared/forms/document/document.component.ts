import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DbDocument, DbDocumentTypeList } from '../../../services/backend/db-models/documents';
import { DbDossier, DbTopic } from '../../../services/backend/db-models/organ';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { DocumentsService } from '../../../services/backend/documents.service';
import { DocumentService } from '../../../services/backend/document.service';
import { DossiersService } from '../../../services/backend/dossiers.service';
import { FormLeaveDialogService } from '../../../services/utils/form-leave-dialog.service';

import { DocumentJson } from '../../../services/backend/db-models/json';
import { DbMainmenu } from '../../../services/backend/db-models/portal';
import { DocumentTypeSelectorComponent } from '../../../shared/document-type-selector/document-type-selector.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})

export class DocumentComponent implements OnInit {

  id: number;
  contentId: number;
  viewId: number;

  form: FormGroup;
  titleCtrl: FormControl;
  dtyCtrl: FormControl;
  descriptionCtrl: FormControl;
  responsibleCtrl: FormControl;
  statusCtrl: FormControl;

  obtainmentCtrl: FormControl;
  executionCtrl: FormControl;
  validityCtrl: FormControl;
  // fileCtrl: FormControl;
  topicsCtrl: FormControl;
  dossierCtrl: FormControl;

  documentTypeCtrl: FormControl;

  dossiersList: any[] = [];

  originalData: any = null;
  pleaseSave = false;

  errorMsg = '';
  errorDetails = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public documentsService: DocumentsService,
    public service: DocumentService, public dossiersService: DossiersService, public dialogRef?: MdDialogRef<DocumentComponent>) { }

  ngOnInit() {
    this.errorMsg = '';
    this.errorDetails = '';
    this.pleaseSave = false;

    this.originalData = null;
    this.createForm(null);

    if (this.id) {
      this.service.getDocument(this.id).subscribe(document => {
        const doc = document ? document[0] : null;
        this.originalData = doc;
        if (this.form) {
          this.updateForm(doc);
        } else {
          this.createForm(doc);
        }
      });
    }

    this.dossiersService.loadDossiers(false, false, null, true)
      .subscribe(dossiers => this.dossiersList = dossiers.map(d => ({ id: d.dos_id, name: d.dos_lastname + ' ' + d.dos_firstname })));
  }

  private createForm(data: DocumentJson) {
    this.descriptionCtrl = new FormControl(data ? data.doc_description : '');
    this.responsibleCtrl = new FormControl(data ? data.par_id_responsible : '');
    this.statusCtrl = new FormControl(data ? data.doc_status : '', Validators.required);
    this.obtainmentCtrl = new FormControl(data ? data.doc_obtainment_date : '');
    this.executionCtrl = new FormControl(data ? data.doc_execution_date : '');
    this.validityCtrl = new FormControl(data ? data.doc_validity_date : '');
    // this.fileCtrl = new FormControl(data ? data.doc_file : '');
    this.dossierCtrl = new FormControl(data ? data.dossiers ? data.dossiers.map(d => d.dos_id) : [] : []);
    this.documentTypeCtrl = new FormControl(data ? {
      title: data.doc_title,
      topics: data.topics ? data.topics.map(t => t.top_id) : [],
      dty: data.dty_id
    } : {
        title: '',
        topics: [],
        dty: ''
      }, DocumentTypeSelectorComponent.validatorTypeOther);

    this.form = this.fb.group({
      description: this.descriptionCtrl,
      responsible: this.responsibleCtrl,
      status: this.statusCtrl,
      obtainment: this.obtainmentCtrl,
      execution: this.executionCtrl,
      validity: this.validityCtrl,
      // file: this.fileCtrl,
      dossiers: this.dossierCtrl,
      documentType: this.documentTypeCtrl
    });
  }

  private updateForm(data: DocumentJson) {
    this.descriptionCtrl.setValue(data ? data.doc_description : '');
    this.responsibleCtrl.setValue(data ? data.par_id_responsible : '');
    this.statusCtrl.setValue(data ? data.doc_status : '');
    this.obtainmentCtrl.setValue(data ? data.doc_obtainment_date : '');
    this.executionCtrl.setValue(data ? data.doc_execution_date : '');
    this.validityCtrl.setValue(data ? data.doc_validity_date : '');
    // this.fileCtrl.setValue(data ? data.doc_file : '');
    this.dossierCtrl.setValue(data ? data.dossiers.map(d => d.dos_id) : []);
    this.documentTypeCtrl.setValue(data ? {
      title: data.doc_title,
      topics: data.topics ? data.topics.map(t => t.top_id) : [],
      dty: data.dty_id
    } : {
        title: '',
        topics: [],
        dty: ''
      });
  }

  onSubmit(url = null) {
    if (!this.id) {
      this.service.addDocument(
        this.responsibleCtrl.value ? this.responsibleCtrl.value : null,
        this.documentTypeCtrl.value.dty > 0 ? this.documentTypeCtrl.value.dty : null,
        this.documentTypeCtrl.value.title,
        this.descriptionCtrl.value, this.statusCtrl.value, this.obtainmentCtrl.value, this.executionCtrl.value,
        this.validityCtrl.value, this.documentTypeCtrl.value.topics, this.dossierCtrl.value
      ).subscribe(ret => {
        this.id = ret;
        this.closeForm(ret);
      },
        (err) => {
          this.errorMsg = 'Error while adding a document';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateDocument(
        this.id, this.responsibleCtrl.value ? this.responsibleCtrl.value : null,
        this.documentTypeCtrl.value.dty > 0 ? this.documentTypeCtrl.value.dty : null,
        this.documentTypeCtrl.value.title,
        this.descriptionCtrl.value, this.statusCtrl.value, this.obtainmentCtrl.value, this.executionCtrl.value,
        this.validityCtrl.value, this.documentTypeCtrl.value.topics, this.dossierCtrl.value
      ).subscribe(ret => {
        this.closeForm(ret);
      },
        (err) => {
          this.errorMsg = 'Error while updating the document';
          this.errorDetails = err.text();
        });
    }
  }

  doCancel() {
    this.closeForm();
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doDelete() {
    this.service.deleteDocument(this.id).subscribe(ret => {
      this.closeForm();
    },
      (err) => {
        this.errorMsg = 'Error while deleting the document';
        this.errorDetails = err.text();
      });
  }

  closeForm(id = null) {
    if (this.form) {
      this.form.reset();
    }

    this.dialogRef.close(id);
  }

  private isStatusDone() {
    if (this.statusCtrl.value === 'done') {
      return true;
    } else {
      return false;
    }
  }
}
