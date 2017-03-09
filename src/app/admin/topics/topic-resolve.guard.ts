import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { TopicService } from '../../services/backend/topic.service';
import { DbTopic } from '../../services/backend/db-models/organ';

@Injectable()
export class TopicResolve implements Resolve<DbTopic> {

  constructor(public topicService: TopicService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DbTopic> | any {
    const id = +route.params['id'];
    return this.topicService.loadTopic(id)
      .catch(e => {
        this.router.navigate(['/admin/topics']);
        return Observable.of(false);
      });
  }
}
