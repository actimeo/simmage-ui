import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../user.service';
import { PgService } from '../pg.service';
import { DbTopic } from '../db-models/organ';

@Injectable()
export class TopicService {

  constructor(private user: UserService, private pg: PgService) { }

  public loadTopic(id: number): Observable<DbTopic> {
    return this.pg.pgcall(
      'organ/topic_get', {
        prm_token: this.user.userData.token,
        prm_id: id
      });
  }

  public updateTopic(id: number, name: string, description: string, icon: string, color: string): Observable<boolean> {
    return this.pg.pgcall(
      'organ/topic_update', {
        prm_token: this.user.userData.token,
        prm_id: id,
        prm_name: name,
        prm_description: description,
        prm_icon: icon,
        prm_color: color
      });
  }

  public addTopic(name: string, description: string, icon: string, color: string): Observable<number> {
    return this.pg.pgcall(
      'organ/topic_add', {
        prm_token: this.user.userData.token,
        prm_name: name,
        prm_description: description,
        prm_icon: icon,
        prm_color: color
      });
  }

  public deleteTopic(id: number) {
    return this.pg.pgcall(
      'organ/topic_delete', {
        prm_token: this.user.userData.token,
        prm_id: id
      });
  }

  public loadTopics(): Observable<DbTopic[]> {
    let sourceTopics = this.pg.pgcall(
      'organ/topics_list', {
        prm_token: this.user.userData.token
      });
    return sourceTopics;
  }
}
