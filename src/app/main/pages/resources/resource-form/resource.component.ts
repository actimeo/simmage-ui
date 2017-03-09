import {ActivatedRoute, Router} from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DbDossier, DbTopic } from '../../../../services/backend/db-models/organ';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CanComponentDeactivate } from '../../../../services/guards/can-deactivate.guard';
import { DbMainmenu } from '../../../../services/backend/db-models/portal';
import { DbResource } from '../../../../services/backend/db-models/resources';
import { DossiersService } from '../../../../services/backend/dossiers.service';
import { Observable } from 'rxjs/Observable';
import { ResourceJson } from '../../../../services/backend/db-models/json';
import { ResourceService } from '../resource.service';
import { ResourcesService } from '../../../../services/backend/resources.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit, AfterViewInit {

  @ViewChild('getfocus') getfocus: ElementRef;

  id: number;
  viewId: number;

  form: FormGroup;
  nameCtrl: FormControl;
  topicsCtrl: FormControl;

  viewTopics: any[] = [];

  originalData: any = null;
  pleaseSave = false;

  errorMsg = '';
  errorDetails = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public resourcesService: ResourcesService,
    public service: ResourceService) { }

  ngOnInit() {
    this.route.data.pluck('resource')
      .subscribe((element: ResourceJson) => {
        const resource = element ? element[0] : null;
        this.originalData = resource;
        this.id = resource ? resource.res_id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(resource);
        } else {
          this.createForm(resource);
        }
      });
    this.route.data.pluck('data')
      .subscribe((data: DbMainmenu) => {
        this.viewId = data.mme_id;
        this.resourcesService.loadViewTopics(data.mme_content_id).subscribe(tops => {
          this.viewTopics = tops.map(t => ({ id: t.top_id, name: t.top_name }));
        });
      });
    }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
  }

  private createForm(data: ResourceJson) {
    this.nameCtrl = new FormControl(data ? data.res_name : '', Validators.required);
    this.topicsCtrl = new FormControl(data ? data.topics ? data.topics.map(t => t.top_id) : [] : []);
    this.form = this.fb.group({
      name: this.nameCtrl,
      topics: this.topicsCtrl
    }, {
      validator: Validators.compose([])
    });
  }

  private updateForm(data: ResourceJson) {
    this.nameCtrl.setValue(data ? data.res_name : '');
    this.topicsCtrl.setValue(data ? data.topics.map(t => t.top_id) : []);
  }

  onSubmit() {
    if (!this.id) {
      this.service.addResource(
        this.nameCtrl.value, this.topicsCtrl.value
      ).subscribe(ret => {
        this.id = ret;
        this.goBackToList(true);
      },
        (err) => {
          this.errorMsg = 'Error while adding a resource';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateResource(
        this.id, this.nameCtrl.value, this.topicsCtrl.value
      ).subscribe(ret => {
        this.goBackToList(true);
      },
        (err) => {
          this.errorMsg = 'Error while updating the resource';
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
    this.service.deleteResource(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error while deleting the resource';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }

    if (withSelected) {
      this.router.navigate(['/main/' + this.viewId + '/resources', { selresource: this.id }]);
    } else {
      this.router.navigate(['/main/' + this.viewId + '/resources']);
    }
  }

  canDeactivate() {
    const ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }

  formLeave(event) {
    switch (event) {
      case 'abort':
        this.doCancel();
        break;
      case 'save':
        this.onSubmit();
        break;
      default:
        this.pleaseSave = false;
    }
  }

}
