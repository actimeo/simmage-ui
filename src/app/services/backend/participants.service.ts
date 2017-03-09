import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { PgService } from './pg.service';
import { UserService } from '../utils/user.service';
import { DbParticipant } from './db-models/organ';

@Injectable()
export class ParticipantsService {

  constructor(public pg: PgService, public user: UserService) { }

  list(): Observable<DbParticipant[]> {
    return this.pg.pgcall('organ/participant_list', {
    });
  }
}
