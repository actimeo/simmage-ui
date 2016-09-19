import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../rxjs_operators';

import { TopicService } from '../db-services/topic.service';
import { DbTopic } from '../db-models/organ';

@Injectable()
export class TopicResolve implements Resolve<DbTopic> {

  constructor(public topicService: TopicService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let id = +route.params['id'];
    return this.topicService.loadTopic(id)
      .catch(e => {
        this.router.navigate(['/admin/topics']);
        return Observable.of(false);
      });
  }
}
