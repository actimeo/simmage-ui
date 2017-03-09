import { Component, ViewChild, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { DocumentsService } from '../../../../shared/documents.service';
import { DocumentService } from '../document.service';
import { DossiersService } from '../../../../services/backend/dossiers.service';

import { DbDocumentTypeList, DbDocument } from '../../../../db-models/documents';
import { DocumentJson } from '../../../../db-models/json';
import { DbTopic, DbDossier } from '../../../../db-models/organ';
import { DbMainmenu } from '../../../../db-models/portal';
import { CanComponentDeactivate } from '../../../../guards/can-deactivate.guard';
import { DocumentTypeSelectorComponent } from '../../../../shared/document-type-selector/document-type-selector.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})

export class DocumentComponent implements OnInit, CanComponentDeactivate {

  id: number;
  viewId: number;
  contentId: number;

  form: FormGroup;
  titleCtrl: FormControl;
  dtyCtrl: FormControl;
  descriptionCtrl: FormControl;
  responsibleCtrl: FormControl;
  statusCtrl: FormControl;

  obtainmentCtrl: FormControl;
  executionCtrl: FormControl;
  validityCtrl: FormControl;
  //fileCtrl: FormControl;
  topicsCtrl: FormControl;
  dossierCtrl: FormControl;

  documentTypeCtrl: FormControl;

  dossiersList: any[] = [];

  originalData: any = null;
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public documentsService: DocumentsService,
    public service: DocumentService, public dossiersService: DossiersService) { }

  ngOnInit() {
    this.route.data.pluck('data')
      .subscribe((data: DbMainmenu) => {
        this.viewId = data.mme_id;
        this.contentId = data.mme_content_id;
      });

    this.route.data.pluck('document')
      .subscribe((element: DocumentJson) => {
        let doc = element ? element[0] : null;
        this.originalData = doc;
        this.id = doc ? doc.doc_id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(doc);
        } else {
          this.createForm(doc);
        }
      });

    this.dossiersService.loadDossiers(false, false, null, true)
      .subscribe(dossiers => this.dossiersList = dossiers.map(d => ({ id: d.dos_id, name: d.dos_lastname + " " + d.dos_firstname })));
  }

  private createForm(data: DocumentJson) {
    this.descriptionCtrl = new FormControl(data ? data.doc_description : '');
    this.responsibleCtrl = new FormControl(data ? data.par_id_responsible : '');
    this.statusCtrl = new FormControl(data ? data.doc_status : '', Validators.required);
    this.obtainmentCtrl = new FormControl(data ? data.doc_obtainment_date : '');
    this.executionCtrl = new FormControl(data ? data.doc_execution_date : '');
    this.validityCtrl = new FormControl(data ? data.doc_validity_date : '');
    //this.fileCtrl = new FormControl(data ? data.doc_file : '');
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
      //file: this.fileCtrl,
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
    //this.fileCtrl.setValue(data ? data.doc_file : '');
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

  onSubmit() {
    if (!this.id) {
      this.service.addDocument(
        this.responsibleCtrl.value ? this.responsibleCtrl.value : null,
        this.documentTypeCtrl.value.dty > 0 ? this.documentTypeCtrl.value.dty : null,
        this.documentTypeCtrl.value.title,
        this.descriptionCtrl.value, this.statusCtrl.value, this.obtainmentCtrl.value, this.executionCtrl.value,
        this.validityCtrl.value, this.documentTypeCtrl.value.topics, this.dossierCtrl.value
      ).subscribe(ret => {
        this.id = ret;
        this.goBackToList(true);
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
        this.goBackToList(true);
      },
        (err) => {
          this.errorMsg = 'Error while updating the document';
          this.errorDetails = err.text();
        });
    }
  }

  doCancel() {
    this.goBackToList();
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doDelete() {
    this.service.deleteDocument(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error while deleting the document';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }

    if (withSelected) {
      this.router.navigate(['/main/' + this.viewId + '/documents', { seldoc: this.id }])
    } else {
      this.router.navigate(['/main/' + this.viewId + '/documents']);
    }
  }

  private isStatusDone() {
    if (this.statusCtrl.value == 'done') {
      return true;
    } else {
      return false;
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }

  formLeave(event) {
    switch(event) {
      case 'abort':
        this.doCancel();
        break;
      case 'save':
        this.onSubmit();
        break;
      case 'return':
      default:
        this.pleaseSave = false;
    }
  }

}
