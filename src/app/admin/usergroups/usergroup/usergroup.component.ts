import '../../../rxjs_operators';

import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CanComponentDeactivate } from '../../../services/guards/can-deactivate.guard';
import { SnackService } from '../../../services/utils/snack.service';
import { UsergroupJson } from '../../../services/backend/db-models/json';
import { UsergroupsService } from '../usergroups.service';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: ElementRef;

  groupsData: any[] = [];
  groupsParticipantsData: any[] = [];
  portalsData: any[] = [];
  topicsData: any[] = [];

  usergroupTopics: any[] = [];

  id: number;

  form: FormGroup;
  nameCtrl: FormControl;
  groupsDossiersCtrl: FormControl;
  portalsCtrl: FormControl;
  groupsParticipantsCtrl: FormControl;
  topicsCtrl: FormControl;
  usergroupRightsCtrl: FormControl;
  statusesCtrl: FormControl;

  originalData: any = null;
  pleaseSave = false;

  errorMsg = '';
  errorDetails = '';

  static elementsNotEmpty(control: FormControl) {
    return control.value && control.value.length !== 0 ? null : { mustContainValues: true };
  }

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public ugs: UsergroupsService, private snackService: SnackService) { }

  ngOnInit() {
    this.route.data.pluck('usergroup')
      .subscribe((usergroup: UsergroupJson) => {
        this.originalData = usergroup;
        this.id = usergroup ? usergroup.ugr_id : null;
        this.errorDetails = '';
        this.errorMsg = '';
        this.pleaseSave = false;

        if (this.form) {
          this.updateForm(usergroup);
        } else {
          this.createForm(usergroup);
        }
        this.ugs.loadGroups().subscribe(groups => {
          this.groupsData = groups.map(g => ({ id: g.grp_id, name: g.org_name + ' - ' + g.grp_name }));
          this.groupsParticipantsData = usergroup && usergroup.groups_dossiers ?
            this.groupsData.filter(g => usergroup.groups_dossiers.map(d => d.grp_id).indexOf(g.id) === -1) :
            this.groupsData.slice(0);
        });

        this.ugs.loadPortals().subscribe(portals => {
          this.portalsData = portals.map(p => ({ id: p.por_id, name: p.por_name }));
        });

        this.ugs.loadTopics().subscribe(topics => {
          this.topicsData = topics.map(t => ({ id: t.top_id, name: t.top_name, icon: t.top_icon }));
        });
      });

  }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
  }

  private createForm(data: UsergroupJson) {
    this.nameCtrl = new FormControl(data && data.ugr_name ? data.ugr_name : '', Validators.required);
    this.groupsDossiersCtrl = new FormControl(data && data.groups_dossiers
      ? data.groups_dossiers.map(g => g.grp_id) : [], UsergroupComponent.elementsNotEmpty);
    this.portalsCtrl = new FormControl(data && data.portals ? data.portals.map(p => p.por_id) : [], UsergroupComponent.elementsNotEmpty);
    this.groupsParticipantsCtrl = new FormControl(data && data.groups_participants ? data.groups_participants.map(u => u.grp_id) : []);
    this.topicsCtrl = new FormControl(data && data.topics ? data.topics.map(t => (
      {
        id: t.top_id,
        rights: t.ugt_rights ? t.ugt_rights : []
      })) : []);
    this.usergroupRightsCtrl = new FormControl(data && data.ugr_rights ? data.ugr_rights : []);
    this.statusesCtrl = new FormControl(data && data.ugr_statuses ? data.ugr_statuses : [], UsergroupComponent.elementsNotEmpty);
    this.form = this.fb.group({
      name: this.nameCtrl,
      groupsDossiers: this.groupsDossiersCtrl,
      portals: this.portalsCtrl,
      groupsParticipants: this.groupsParticipantsCtrl,
      topics: this.topicsCtrl,
      rights: this.usergroupRightsCtrl,
      statuses: this.statusesCtrl
    });
    this.setGroupDossierToParticipant();
  }

  private updateForm(data: UsergroupJson) {
    this.nameCtrl.setValue(data && data.ugr_name ? data.ugr_name : '');
    this.groupsDossiersCtrl.setValue(data && data.groups_dossiers ? data.groups_dossiers.map(g => g.grp_id) : []);
    this.portalsCtrl.setValue(data && data.portals ? data.portals.map(p => p.por_id) : []);
    this.groupsParticipantsCtrl.setValue(data && data.groups_participants ? data.groups_participants.map(u => u.grp_id) : []);
    this.topicsCtrl.setValue(data && data.topics ? data.topics.map(t => (
      {
        id: t.top_id,
        rights: t.ugt_rights ? t.ugt_rights : []
      })) : []);
    this.usergroupRightsCtrl.setValue(data && data.ugr_rights ? data.ugr_rights : []);
    this.statusesCtrl.setValue(data && data.ugr_statuses ? data.ugr_statuses : []);
    this.setGroupDossierToParticipant();
  }

  private setGroupDossierToParticipant() {
    this.groupsDossiersCtrl.valueChanges.subscribe(dossiers => {
      const oldGPD = this.groupsParticipantsData.slice(0);
      this.groupsParticipantsData = dossiers ? this.groupsData.filter(g => dossiers.indexOf(g.id) === -1) : this.groupsData.slice(0);
      const removedGroup = oldGPD.find(g => this.groupsParticipantsData.indexOf(g) === -1);
      if (removedGroup !== undefined) {
        this.snackService.message({
          message: 'Group "' + removedGroup.name + '" removed from "Authorized employees only"',
          action: 'ok'
        });
        this.groupsParticipantsCtrl.setValue(this.groupsParticipantsCtrl.value.filter(g => g !== removedGroup.id));
      }
    });
  }

  onSubmit() {
    if (!this.id) {
      this.ugs.addUsergroup(this.nameCtrl.value, this.usergroupRightsCtrl.value, this.statusesCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.updateUsergroup(true);
        },
        (err) => {
          this.errorMsg = 'Error while adding usergroup';
          this.errorDetails = err.text();
        });
    } else {
      this.updateUsergroup();
    }
  }

  private updateUsergroup(newUsergroup = false) {
    this.ugs.updateUsergroup(this.id, this.nameCtrl.value, this.groupsDossiersCtrl.value, this.portalsCtrl.value,
      this.groupsParticipantsCtrl.value, this.topicsCtrl.value, this.usergroupRightsCtrl.value, this.statusesCtrl.value, newUsergroup)
      .subscribe(
      () => {
        this.goBackToList(true);
      },
      (err) => {
        this.errorMsg = 'Error while updating usergroup';
        this.errorDetails = err.text();
      }
      );
  }

  doCancel() {
    this.goBackToList();
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doDelete() {
    this.ugs.deleteUsergroup(this.id).subscribe(
      ret => {
        this.goBackToList();
      },
      (err) => {
        this.errorMsg = 'Error while deleting an usergroup';
        this.errorDetails = err.text();
      }
    );
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/usergroups', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/usergroups']);
    }
  }

  canDeactivate() {
    const ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
