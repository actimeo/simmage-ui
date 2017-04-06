import { SwitchthemeService } from './../../services/utils/switchtheme.service';
import { Subscription } from 'rxjs/Subscription';
import { DossierInfoJson } from './../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { ReduxService } from './../../services/utils/redux.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dossier-details',
  templateUrl: './dossier-details.component.html',
  styleUrls: ['./dossier-details.component.css']
})
export class DossierDetailsComponent implements OnInit, OnDestroy {

  public dossier: DossierInfoJson;
  private subs: Subscription[] = [];
  public theme: boolean;

  constructor(private switchthemeService: SwitchthemeService,
    private route: ActivatedRoute, private redux: ReduxService) { }

  ngOnInit() {
    this.subs.push(this.route.data.pluck('data').subscribe((dossier: DossierInfoJson) => this.dossier = dossier));
    this.subs.push(this.switchthemeService.navItem$.subscribe(item => this.theme = item));

  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
