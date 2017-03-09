import { UserService } from './../../services/utils/user.service';
import { UserData } from './../../data/user-data';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-userinfo',
  templateUrl: './account-userinfo.component.html',
  styleUrls: ['./account-userinfo.component.css']
})
export class AccountUserinfoComponent implements OnInit {

  public username: Observable<string>;

  constructor(private user: UserService) {
    this.username = this.user.userDataState
      .map((u: UserData) => u.getFullName());
   }

  ngOnInit() {
  }

}
