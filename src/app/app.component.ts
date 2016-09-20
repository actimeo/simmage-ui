import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import './rxjs_operators';

import { UserService } from './db-services/user.service';
import { UserData } from './data/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public sub: Subscription = null;

  constructor(private user: UserService, public router: Router) {
  }

  ngOnInit() {
    let source: Observable<boolean> = this.user.userDataState.map((u: UserData) => u.loggedIn);

    // Go to home at login
    //    source.filter((u: boolean) => u === true)
    //      .subscribe(() => this.router.navigate(['/']));

    // Go to login page when logged out
    this.sub = source
      .filter((u: boolean) => u === false)
      .subscribe(() => this.router.navigate(['/login']));
  }

  ngOnDestroy() {
    if (this.sub !== null) {
      this.sub.unsubscribe();
    }
  }
}
