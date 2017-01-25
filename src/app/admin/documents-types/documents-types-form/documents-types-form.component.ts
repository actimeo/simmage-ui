import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';

import '../../../rxjs_operators';

import { DocumentsTypesService } from '../documents-types.service';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';
import { TopicService } from '../../../shared/topic.service';
import { OrganService } from '../../../shared/organ.service';

import { DocumentTypeJson } from '../../../db-models/json';

@Component({
  selector: 'app-documents-types-form',
  templateUrl: './documents-types-form.component.html',
  styleUrls: ['./documents-types-form.component.css']
})
export class DocumentsTypesFormComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: ElementRef;

  id: number = null;

  form: FormGroup;
  nameCtrl: FormControl;
  individualNameCtrl: FormControl;
  topicsCtrl: FormControl;
  organsCtrl: FormControl;

  topicsList: any[] = [];
  orgsList: any[] = [];

  originalData: any = null;

  pleaseSave: boolean = false;
  errorMsg: string = '';
  errorDetails: string = '';

  static topicsNotEmpty(control: FormControl) {
    return control.value && control.value.length !== 0 ? null : { mustContainValues: true };
  }

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public service: DocumentsTypesService,
    private topicService: TopicService, private organService: OrganService) { }

  ngOnInit() {
    this.topicService.loadTopics().subscribe(topics => {
      this.topicsList = topics.map(t => ({ id: t.top_id, name: t.top_name }));
    });

    this.organService.loadOrganizations(true).subscribe(orgs => {
      this.orgsList = orgs.map(o => ({ id: o.org_id, name: o.org_name }));
    });

    this.route.data.pluck('documentsTypes')
      .subscribe((documentType: DocumentTypeJson) => {
        this.originalData = documentType;
        this.id = documentType ? documentType.dty_id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(documentType);
        } else {
          this.createForm(documentType);
        }
      });
  }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
  }

  private createForm(data: DocumentTypeJson) {
    this.nameCtrl = new FormControl(data ? data.dty_name : '', Validators.required);
    this.individualNameCtrl = new FormControl(data ? data.dty_individual_name : null, Validators.required);
    this.topicsCtrl = new FormControl(data ? data.topics.map(t => t.top_id) : []);
    this.organsCtrl = new FormControl(data ? data.organizations.map(o => o.org_id) : []);
    this.form = this.fb.group({
      name: this.nameCtrl,
      individualName: this.individualNameCtrl,
      topics: this.topicsCtrl,
      organs: this.organsCtrl
    });
  }

  private updateForm(data: DocumentTypeJson) {
    this.nameCtrl.setValue(data ? data.dty_name : '');
    this.individualNameCtrl.setValue(data ? data.dty_individual_name : null);
    this.topicsCtrl.setValue(data ? data.topics.map(t => t.top_id) : []);
    this.organsCtrl.setValue(data ? data.organizations.map(o => o.org_id) : []);
  }

  onSubmit() {
    if (!this.id) {
      this.service.addDocumentsTypes(this.nameCtrl.value,
        this.individualNameCtrl.value, this.topicsCtrl.value, this.organsCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding documents-types';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateDocumentsTypes(this.id, this.nameCtrl.value,
        this.individualNameCtrl.value, this.topicsCtrl.value, this.organsCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error updating documents-types';
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
    this.service.deleteDocumentsTypes(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting documents-types';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/documents-types', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/documents-types']);
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
