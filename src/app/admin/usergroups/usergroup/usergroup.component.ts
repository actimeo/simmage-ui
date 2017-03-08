import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import '../../../rxjs_operators';

import { UsergroupJson } from '../../../db-models/json';
import { UsergroupsService } from '../usergroups.service';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';
import { SnackService } from '../../../snack.service';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: ElementRef;

  private subs: Subscription[] = [];

  groupsData: any[] = [];
  groupsParticipantsData: any[] = [];
  portalsData: any[] = [];
  topicsData: any[] = [];

  usergroupTopics: any[] = [];

  id: number;

  form: FormGroup;
  nameCtrl: FormControl;
  dossiersCtrl: FormControl;
  portalsCtrl: FormControl;
  participantsCtrl: FormControl;
  topicsCtrl: FormControl;
  usergroupRightsCtrl: FormControl;
  statusesCtrl: FormControl;

  originalData: any = null;
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

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
          this.groupsParticipantsData = usergroup && usergroup.dossiers ?
                                                this.groupsData.filter(g => usergroup.dossiers.map(d => d.grp_id).indexOf(g.id) == -1) :
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
    this.dossiersCtrl = new FormControl(data && data.dossiers ? data.dossiers.map(g => g.grp_id) : [], UsergroupComponent.elementsNotEmpty);
    this.portalsCtrl = new FormControl(data && data.portals ? data.portals.map(p => p.por_id) : [], UsergroupComponent.elementsNotEmpty);
    this.participantsCtrl = new FormControl(data && data.participants ? data.participants.map(u => u.grp_id) : []);
    this.topicsCtrl = new FormControl(data && data.topics ? data.topics.map(t => (
      {
        id: t.top_id,
        rights: t.ugt_rights ? t.ugt_rights : []
      })) : []);
    this.usergroupRightsCtrl = new FormControl(data && data.ugr_rights ? data.ugr_rights : []);
    this.statusesCtrl = new FormControl(data && data.ugr_statuses ? data.ugr_statuses : [], UsergroupComponent.elementsNotEmpty)
    this.form = this.fb.group({
      name: this.nameCtrl,
      dossiers: this.dossiersCtrl,
      portals: this.portalsCtrl,
      participants: this.participantsCtrl,
      topics: this.topicsCtrl,
      rights: this.usergroupRightsCtrl,
      statuses: this.statusesCtrl
    });
    this.setGroupDossierToParticipant();
  }

  private updateForm(data: UsergroupJson) {
    this.nameCtrl.setValue(data && data.ugr_name ? data.ugr_name : '');
    this.dossiersCtrl.setValue(data && data.dossiers ? data.dossiers.map(g => g.grp_id) : []);
    this.portalsCtrl.setValue(data && data.portals ? data.portals.map(p => p.por_id) : []);
    this.participantsCtrl.setValue(data && data.participants ? data.participants.map(u => u.grp_id) : []);
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
    this.dossiersCtrl.valueChanges.subscribe(dossiers => {
      let oldGPD = this.groupsParticipantsData.slice(0);
      this.groupsParticipantsData = dossiers ? this.groupsData.filter(g => dossiers.indexOf(g.id) == -1) : this.groupsData.slice(0);
      let removedGroup = oldGPD.find(g => this.groupsParticipantsData.indexOf(g) == -1);
      if (removedGroup != undefined) {
        this.snackService.message({
          message: 'Group "' + removedGroup.name + '" removed from "Authorized employees only"',
          action: 'ok'
        });
        this.participantsCtrl.setValue(this.participantsCtrl.value.filter(g => g != removedGroup.id));
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
    this.ugs.updateUsergroup(this.id, this.nameCtrl.value, this.dossiersCtrl.value, this.portalsCtrl.value,
      this.participantsCtrl.value ,this.topicsCtrl.value, this.usergroupRightsCtrl.value, this.statusesCtrl.value, newUsergroup)
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
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
