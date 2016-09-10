import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import './rxjs_operators';

import { UserService, UserData } from './db-services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private user: UserService, private router: Router) {
    let source: Observable<boolean> = this.user.userDataState.map((u: UserData) => u.loggedIn);

    // Go to home at login
    source.filter((u: boolean) => u === true)
      .subscribe(() => this.router.navigate(['/']));

    // Go to login page when logged out
    source.filter((u: boolean) => u === false)
      .subscribe(() => this.router.navigate(['/login']));
  }
}
