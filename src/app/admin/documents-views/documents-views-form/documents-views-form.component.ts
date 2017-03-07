import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { DocumentsViewsService } from '../documents-views.service';
import { DbDocumentsviewGet, DbDocumentTypeList } from '../../../db-models/documents';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';
import { TopicService } from '../../../shared/topic.service';
import { DocumentsService } from '../../../shared/documents.service';

@Component({
  selector: 'app-documents-views-form',
  templateUrl: './documents-views-form.component.html',
  styleUrls: ['./documents-views-form.component.css']
})
export class DocumentsViewsFormComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: ElementRef;

  id: number;

  form: FormGroup;
  nameCtrl: FormControl;
  topicsCtrl: FormControl;
  dtyCtrl: FormControl;

  topicsList: any[] = [];
  documentsTypesList: Observable<DbDocumentTypeList[]>;

  originalData: any = null;
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public service: DocumentsViewsService,
    private topicService: TopicService, private documentsService: DocumentsService) { }

  ngOnInit() {

    this.topicService.loadTopics().subscribe(topics => {
      this.topicsList = topics.map(t => ({ id: t.top_id, name: t.top_name }));
    });

    this.route.data.pluck('documentsViews')
      .subscribe((element: DbDocumentsviewGet) => {
        this.originalData = element;
        this.id = element ? element.dov_id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(element);
        } else {
          this.createForm(element);
        }
      });
  }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
  }

  private createForm(data: DbDocumentsviewGet) {
    this.nameCtrl = new FormControl(data ? data.dov_name : '', Validators.required);
    this.topicsCtrl = new FormControl(data ? data.top_ids : []);
    this.dtyCtrl = new FormControl(data ? data.dty_id : '');
    this.form = this.fb.group({
      name: this.nameCtrl,
      topics: this.topicsCtrl,
      dty: this.dtyCtrl
    });
    if (data) {
      this.documentsTypesList = this.documentsService.filterDocumentsTypes(data.top_ids);
    }
    this.form.valueChanges.subscribe(v => {
      this.documentsTypesList = this.documentsService.filterDocumentsTypes(v.topics);
    });
  }

  private updateForm(data: DbDocumentsviewGet) {
    this.nameCtrl.setValue(data ? data.dov_name : '');
    this.topicsCtrl.setValue(data ? data.top_ids : []);
    this.dtyCtrl.setValue(data ? data.dty_id : '');
  }

  onSubmit() {
    if (!this.id) {
      this.service.addDocumentsViews(
        this.nameCtrl.value,
        this.dtyCtrl.value > 0 ? this.dtyCtrl.value : null,
        this.topicsCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding documents-views';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateDocumentsViews(
        this.id,
        this.nameCtrl.value,
        this.dtyCtrl.value > 0 ? this.dtyCtrl.value : null,
        this.topicsCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error updating documents-views';
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
    this.service.deleteDocumentsViews(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting documents-views';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/documents-views', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/documents-views']);
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
