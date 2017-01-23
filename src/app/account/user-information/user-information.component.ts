import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { UserData } from './../../data/user-data';
import { PgService } from '../../pg.service';
import { DbUsergroup } from '../../db-models/login';
import { Observable } from 'rxjs/Observable';
import { DbTopic } from '../../db-models/organ';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  
  constructor(private userService : UserService, private pgService : PgService) { }
  
  userGroup: DbUsergroup;
  par_firstname = this.userService.userData.firstname;
  par_lastname = this.userService.userData.lastname;
  usr_login = this.userService.userData.login;
  usr_rights = this.userService.userData.rights;
  authorized_groups = this.userService.userData.groups;
  authorized_portals = this.userService.userData.portals;
  userGroupTopic: Observable<DbTopic[]>;
  userGroupTopicRight: Observable<DbTopic[]>;
  ngOnInit() {
    this.pgService.pgcall('login/usergroup_get', {prm_ugr_id: this.userService.userData.usergroupId} )
    .subscribe(
      (a) => { this.userGroup = a}
    );
    
    this.pgService.pgcall('login/usergroup_topic_list', {prm_ugr_id: this.userService.userData.usergroupId} )
    .subscribe(
      (a) => { 
        this.userGroupTopic = a;
        
        this.pgService.pgcall('login/usergroup_topic_get_rights', {
          prm_ugr_id: this.userService.userData.usergroupId, 
          prm_top_id: this.userGroupTopic[0].top_id} )
        .subscribe(
          (a) => { this.userGroupTopicRight = a;
            console.log(this.userGroupTopicRight)}
        ); 
      }
    );
    
    
    
  }

}
