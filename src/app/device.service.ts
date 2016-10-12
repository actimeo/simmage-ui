import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import './rxjs_operators';

@Injectable()
export class DeviceService {

  public deviceType$ = new ReplaySubject<string>(1);

  constructor() {
    this.initObservable();
  }

  convertWidthToDeviceType(e) {
    if (e.target.innerWidth >= 800) {
      return 'desktop';
    } else {
      return 'mobile';
    }
  }

  private initObservable() {
    Observable.fromEvent(window, 'resize')
      .startWith({ target: { innerWidth: window.innerWidth } })
      .debounceTime(300)
      .map(event => this.convertWidthToDeviceType(event))
      .distinctUntilChanged()
      .subscribe((device: string) => this.deviceType$.next(device));
  }

}
