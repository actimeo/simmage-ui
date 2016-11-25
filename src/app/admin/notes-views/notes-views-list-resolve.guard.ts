import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { NotesViewsService } from './notes-views.service';

@Injectable()
export class NotesViewsListResolve implements Resolve<any> {

  constructor(public service: NotesViewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    return this.service.loadNotesViews();
  }
}
