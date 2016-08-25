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
  title = 'app works!';

  constructor(private user: UserService, private router: Router) {
//    this.goToHomePageOnLogin();
    this.goToLoginPageOnLogout();
  }

  private goToLoginPageOnLogout() {
    console.log('[react] init');
    this.user.loggedInState.subscribe((loggedIn) => {
      console.log('[react] get isLoggedIn: ' + loggedIn);
      if (loggedIn) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

/*  private goToHomePageOnLogin() {
    console.log('[react] init');
    this.user.loggedInState.filter((f) => f === true).subscribe(() => {
      console.log('[react] get isLoggedIn: true');
      this.router.navigateByUrl('/');
    });
  }*/
}
