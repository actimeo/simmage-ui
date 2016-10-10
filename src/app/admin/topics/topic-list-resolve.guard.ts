import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { TopicService } from '../../shared/topic.service';
import { DbTopic } from '../../db-models/organ';

@Injectable()
export class TopicListResolve implements Resolve<DbTopic[]> {

  constructor(public topicService: TopicService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DbTopic[]> {
    return this.topicService.loadTopics();
  }
}
