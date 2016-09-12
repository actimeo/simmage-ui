import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { TopicService } from '../../db-services/topic.service';
import { DbTopic } from '../../db-models/organ';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, OnDestroy {

  routeSubs: Subscription = null;
  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;

  topicSubs: Subscription = null;

  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private topicService: TopicService) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.descriptionCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl,
      description: this.descriptionCtrl
    });

    this.routeSubs = this.route.params.subscribe(
      params => {
        if (params['id'] === 'new') {
          this.id = 0;
          this.creatingNew = true;
          this.setNewTopic();
        } else {
          this.id = +params['id'];
          this.creatingNew = false;
          this.loadTopic();
        }
      });
  }

  ngOnDestroy() {
    if (this.routeSubs) {
      this.routeSubs.unsubscribe();
    }
    if (this.topicSubs) {
      this.topicSubs.unsubscribe();
    }
  }

  private loadTopic() {
    this.topicSubs = this.topicService.loadTopic(this.id)
      .subscribe((data: DbTopic) => {
        this.nameCtrl.setValue(data.top_name);
        this.descriptionCtrl.setValue(data.top_description);
      });
  }

  private setNewTopic() {
    this.nameCtrl.setValue('');
    this.descriptionCtrl.setValue('');
  }

  onSubmit() {
    if (this.creatingNew) {
      this.topicService.addTopic(this.nameCtrl.value, this.descriptionCtrl.value)
        .subscribe(ret => {
          this.router.navigate(['/admin/topics']);
        });
    } else {
      this.topicService.updateTopic(this.id, this.nameCtrl.value, this.descriptionCtrl.value)
        .subscribe(ret => {
          this.router.navigate(['/admin/topics']);
        });
    }
  }

  doCancel() {
    this.router.navigate(['/admin/topics']);
  }

  doDelete() {
    this.topicService.deleteTopic(this.id).subscribe(ret => {
      this.router.navigate(['/admin/topics']);
    });
  }
}
