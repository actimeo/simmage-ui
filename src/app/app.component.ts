import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import './rxjs_operators';

import { UserService } from './user.service';
import { UserData } from './data/user-data';
import { SnackService, SnackBarMessage } from './snack.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public sub: Subscription = null;

  constructor(private user: UserService, public router: Router,
    public viewContainerRef: ViewContainerRef, private snackbar: MdSnackBar,
    private snackService: SnackService) {
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

    this.snackService.newMessage$.subscribe(m => this.showSnackBar(m));
  }

  ngOnDestroy() {
    if (this.sub !== null) {
      this.sub.unsubscribe();
    }
  }

  private showSnackBar(message: SnackBarMessage) {
    this.snackbar.open(message.message, message.action);
  }
}
