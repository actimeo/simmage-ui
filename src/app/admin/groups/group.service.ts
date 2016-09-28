import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UserService } from '../../shared/user.service';
import { PgService } from '../../pg.service';

@Injectable()
export class GroupService implements OnDestroy {

  constructor(private user: UserService, private pg: PgService) { }

  

}
