import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { UserData } from './../data/user-data';
import { PgService } from '../pg.service';
import { DbUsergroup } from '../db-models/login';
import { Observable } from 'rxjs/Observable';
import { DbTopic } from '../db-models/organ';

@Injectable()
export class AccountService {

  constructor(private userService : UserService, private pgService : PgService) { }

  getUserInformation(){
    var req = {
      usr_login:true,
      usr_rights:true,
      usr_last_connection_ip:true,
      usr_last_connection_date:true,
      participant: {
        par_firstname:true,
        par_lastname:true
      },
      usergroup: {
        ugr_id:true,
        ugr_name:true,
        ugr_rights:true,
        portals:{por_name:true},
        groups:{grp_name:true},
        topics:{top_name:true, ugt_rights:true}
      }
    };
    return this.pgService.pgcall("login/user_json", {req:JSON.stringify(req)});
  }
}
