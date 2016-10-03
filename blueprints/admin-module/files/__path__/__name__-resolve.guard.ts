import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { <%= classifiedModuleName %>Service } from './<%= dasherizedModuleName %>.service';

@Injectable()
export class <%= classifiedModuleName %>Resolve implements Resolve<any> {

  constructor(public service: <%= classifiedModuleName %>Service, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let id = +route.params['id'];
    return this.service.load(id)
      .catch(e => {
        this.router.navigate(['/admin/<%= dasherizedModuleName %>']);
        return Observable.of(false);
      });
  }
}
