import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import '../rxjs_operators';

import { DbTopic } from '../db-models/organ';
import { UserService, UserData } from './user.service';
import { PgService } from '../pg.service';

@Injectable()
export class TopicsService {

  public topicsState: Observable<DbTopic[]>;
//  private topicsObserver: Subject<DbTopic[]>;

  constructor(private user: UserService, private pg: PgService) {
//    this.topicsObserver = new Subject<DbTopic[]>();
//    this.topicsState = this.topicsObserver.asObservable();
    this.topicsState = this.loadTopics();
  }

  private loadTopics(): Observable<DbTopic[]> {
    let sourceTopics = this.pg.pgcall(
      'organ/topics_list', {
        prm_token: this.user.userData.token
      });
    return sourceTopics;
  }
}
