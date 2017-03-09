import { Component, OnInit } from '@angular/core';
import { DbUsergroup } from '../../services/backend/db-models/login';
import { Observable } from 'rxjs/Observable';
import { DbTopic } from '../../services/backend/db-models/organ';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  userInfo: any;

  constructor(private accountService: AccountService) { }
  ngOnInit() {
    this.accountService.getUserInformation().subscribe(
      data => this.userInfo = data
    );
  }
}
