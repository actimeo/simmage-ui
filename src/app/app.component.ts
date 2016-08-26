import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(private user: UserService, private router: Router) {
    this.goToLoginPageOnLogout();
  }

  private goToLoginPageOnLogout() {
    this.user.userDataState.subscribe((userData) => {
      if (userData.loggedIn) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
