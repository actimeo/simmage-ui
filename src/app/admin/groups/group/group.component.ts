import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { GroupService } from '../group.service';
import { DbGroup, DbOrganization } from '../../../db-models/organ';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, CanComponentDeactivate {

  id: number;
  creatingNew: boolean = false;

  organizationList: DbOrganization[] = [];
  topicList: any[] = [];

  private groupTopics: number[] = [];

  form: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;
  mandatoryCtrl: FormControl;
  orientationCtrl: FormControl;
  organizationCtrl: FormControl;
  topicsCtrl: FormControl;

  originalData: DbGroup = {
    grp_id: null,
    grp_name: null,
    grp_description: null,
    grp_mandatory: null,
    grp_orientation: null,
    org_id: null
  };
  originalTopics: number[] = null;
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  static topicsNotEmpty(control: FormControl) {
    return control.value.length !== 0 ? null : { mustContainValues: true };
  }

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public gs: GroupService) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.descriptionCtrl = new FormControl('', Validators.required);
    this.mandatoryCtrl = new FormControl('', Validators.required);
    this.orientationCtrl = new FormControl('', Validators.required);
    this.organizationCtrl = new FormControl(0, Validators.required);
    this.topicsCtrl = new FormControl(this.groupTopics, GroupComponent.topicsNotEmpty);
    this.form = this.fb.group({
      name: this.nameCtrl,
      description: this.descriptionCtrl,
      mandatory: this.mandatoryCtrl,
      orientation: this.orientationCtrl,
      organization: this.organizationCtrl,
      topics: this.topicsCtrl
    });

    this.gs.loadOrganizations().subscribe(organs => this.organizationList = organs);
    this.gs.loadTopics().subscribe(topics => {
      topics.forEach(t => {
        this.topicList.push({ id: t.top_id, name: t.top_name });
      });
    });

    this.route.data.forEach((data: { group: any }) => {
      if ('group' in data) {
        this.groupTopics = [];
        this.id = data.group.group.grp_id;
        this.creatingNew = false;
        this.nameCtrl.setValue(data.group.group.grp_name);
        this.descriptionCtrl.setValue(data.group.group.grp_description);
        this.mandatoryCtrl.setValue(data.group.group.grp_mandatory);
        this.orientationCtrl.setValue(data.group.group.grp_orientation);
        this.organizationCtrl.setValue(data.group.group.org_id);
        data.group.topics.forEach(t => {
          this.groupTopics.push(t.top_id);
        });
        this.topicsCtrl.setValue(this.groupTopics);
      } else {
        this.groupTopics = [];
        this.creatingNew = true;
        this.nameCtrl.setValue('');
        this.descriptionCtrl.setValue('');
        this.mandatoryCtrl.setValue('');
        this.orientationCtrl.setValue('');
        this.organizationCtrl.setValue(0);
      }
      this.setOriginalDataFromFields();
      this.errorMsg = '';
      this.errorDetails = '';
      this.pleaseSave = false;
    });
  }

  onSubmit() {
    this.setOriginalDataFromFields();
    if (this.creatingNew) {
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

  doCancel() {
    this.setOriginalDataFromFields();
    this.goBackToList();
  }

  doDelete() {
    this.setOriginalDataFromFields();
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
    if (withSelected) {
      this.router.navigate(['/admin/groups', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/groups']);
    }
  }

  canDeactivate() {
    if (this.originalDataChanged()) {
      this.pleaseSave = true;
      return false;
    } else {
      return true;
    }
  }

  private setOriginalDataFromFields() {
    this.originalData.grp_name = this.nameCtrl.value;
    this.originalData.grp_description = this.descriptionCtrl.value;
    this.originalData.grp_mandatory = this.mandatoryCtrl.value;
    this.originalData.grp_orientation = this.orientationCtrl.value;
    this.originalData.org_id = +this.organizationCtrl.value;
    this.originalTopics = this.topicsCtrl.value.slice(0).sort();
  }

  private originalDataChanged() {
    console.log(this.originalData.org_id);
    console.log(this.organizationCtrl.value);


    return this.originalData.grp_name !== this.nameCtrl.value
      || this.originalData.grp_description !== this.descriptionCtrl.value
      || this.originalData.grp_mandatory !== this.mandatoryCtrl.value
      || this.originalData.grp_orientation !== this.orientationCtrl.value
      || this.originalData.org_id !== +this.organizationCtrl.value
      || !this.arraysEquals(this.originalTopics, this.topicsCtrl.value);
  }

  private arraysEquals(sortedA1: number[], unsortedA2: number[]): boolean {
    if (sortedA1.length !== unsortedA2.length) {
      return false;
    }

    let a2 = unsortedA2.slice(0).sort();
    let error = false;
    sortedA1.forEach((e, i) => {
      if (a2[i] !== e) {
        error = true;
      }
    });
    return !error;
  }

}