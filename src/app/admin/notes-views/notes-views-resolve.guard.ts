import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { NotesViewsService } from './notes-views.service';

@Injectable()
export class NotesViewsResolve implements Resolve<any> {

  constructor(public service: NotesViewsService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let id = +route.params['id'];
    return this.service.getNotesViews(id)
      .catch(e => {
        this.router.navigate(['/admin/notes-views']);
        return Observable.of(false);
      });
  }
}
