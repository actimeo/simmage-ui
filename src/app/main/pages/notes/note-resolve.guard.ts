import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { NoteService } from '../../../services/backend/note.service';

@Injectable()
export class NoteResolve implements Resolve<any> {

  constructor(public service: NoteService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let id = +route.params['id'];
    return this.service.getNote(id);
  }

}
