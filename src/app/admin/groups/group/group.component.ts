import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import '../../../rxjs_operators';

import { GroupService } from '../group.service';
import { DbTopic, DbGroup, DbOrganization } from '../../../db-models/organ';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: ElementRef;

  id: number;

  organizationList: DbOrganization[] = [];
  topicList: any[] = [];

  form: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;
  organizationCtrl: FormControl;
  mandatoryCtrl: FormControl;
  orientationCtrl: FormControl;
  topicsCtrl: FormControl;

  originalData: any = null;

  pleaseSave: boolean = false;
  errorMsg: string = '';
  errorDetails: string = '';

  static topicsNotEmpty(control: FormControl) {
    return control.value && control.value.length !== 0 ? null : { mustContainValues: true };
  }

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public gs: GroupService) { }

  ngOnInit() {
    this.gs.loadOrganizations().subscribe(organs => this.organizationList = organs);

    this.gs.loadTopics().subscribe(topics => {
      this.topicList = topics.map(t => ({ id: t.top_id, name: t.top_name }));
    });

    this.route.data.pluck('group').subscribe((group: any) => {
      this.originalData = group;
      this.id = group ? group.group.grp_id : null;
      this.errorMsg = '';
      this.errorDetails = '';
      this.pleaseSave = false;
      if (this.form) {
        this.updateForm(group);
      } else {
        this.createForm(group);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
  }

  private createForm(data: { group: DbGroup, topics: DbTopic[] }) {
    this.nameCtrl = new FormControl(data ? data.group.grp_name : '', Validators.required);
    this.descriptionCtrl = new FormControl(data ? data.group.grp_description : '', Validators.required);
    this.organizationCtrl = new FormControl(data ? data.group.org_id : 0, Validators.required);
    this.mandatoryCtrl = new FormControl(data ? data.group.grp_mandatory : '', Validators.required);
    this.orientationCtrl = new FormControl(data ? data.group.grp_orientation : 'organization', Validators.required);
    let groupTopics = data ? data.topics.map(t => t.top_id) : [];
    this.topicsCtrl = new FormControl(groupTopics, GroupComponent.topicsNotEmpty);
    this.form = this.fb.group({
      name: this.nameCtrl,
      description: this.descriptionCtrl,
      organization: this.organizationCtrl,
      mandatory: this.mandatoryCtrl,
      orientation: this.orientationCtrl,
      topics: this.topicsCtrl
    });
  }

  private updateForm(data: { group: DbGroup, topics: DbTopic[] }) {
    this.nameCtrl.setValue(data ? data.group.grp_name : '');
    this.descriptionCtrl.setValue(data ? data.group.grp_description : '');
    this.organizationCtrl.setValue(data ? data.group.org_id : 0);
    this.mandatoryCtrl.setValue(data ? data.group.grp_mandatory : '');
    this.orientationCtrl.setValue(data ? data.group.grp_orientation : 'organization');
    let groupTopics = data ? data.topics.map(t => t.top_id) : [];
    this.topicsCtrl.setValue(groupTopics);
  }

  onSubmit() {
    if (!this.id) {
      this.gs.addGroup(this.nameCtrl.value, this.descriptionCtrl.value,
        this.mandatoryCtrl.value, this.orientationCtrl.value, this.organizationCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.onSubmitSetTopics();
        },
        (err) => {
          this.errorMsg = 'Error occured while adding a group';
          this.errorDetails = err.text();
        });
    } else {
      this.gs.updateGroup(this.id, this.nameCtrl.value, this.descriptionCtrl.value,
        this.mandatoryCtrl.value, this.orientationCtrl.value, this.organizationCtrl.value)
        .subscribe(ret => {
          this.onSubmitSetTopics();
        },
        (err) => {
          this.errorMsg = 'Error while updating a group';
          this.errorDetails = err.text();
        });
    }
  }

  private onSubmitSetTopics() {
    this.gs.setTopics(this.id, this.topicsCtrl.value)
      .subscribe(ret => {
        this.goBackToList(true);
      },
      (err) => {
        this.errorMsg = 'Error occured while saving the topics linked to the group';
        this.errorDetails = err.text();
      });
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doCancel() {
    this.goBackToList();
  }

  doDelete() {
    this.gs.setTopics(this.id, null).subscribe(ret => {
      this.gs.deleteGroup(this.id).subscribe(ret2 => {
        this.goBackToList();
      },
        (err) => {
          this.errorMsg = 'Error while deleting a group';
          this.errorDetails = err.text();
        });
    },
      (err) => {
        this.errorMsg = 'Error while removing all topics linked to the group';
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/groups', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/groups']);
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }

}
