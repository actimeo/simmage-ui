import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { <%= classifiedModuleName %>Service } from './<%= dasherizedModuleName %>.service';

@Injectable()
export class <%= classifiedModuleName %>ListResolve implements Resolve<any> {

  constructor(public service: <%= classifiedModuleName %>Service) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    return this.service.load<%= classifiedModuleName %>();
  }
}
