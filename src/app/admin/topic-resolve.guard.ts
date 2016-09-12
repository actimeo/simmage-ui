import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TopicService } from '../db-services/topic.service';
import { DbTopic } from '../db-models/organ';

@Injectable()
export class TopicResolve implements Resolve<DbTopic> {

  constructor(private topicService: TopicService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    let id = +route.params['id'];
    return this.topicService.loadTopic(id)
      .map(topic => topic)
      .catch(e => {
        console.log('Catch Error in TopicResolve');
        this.router.navigate(['/admin/topics']);
        return false;
      });
  }
}
