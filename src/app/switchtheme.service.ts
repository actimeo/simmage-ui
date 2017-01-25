import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
  
@Injectable()
export class SwitchthemeService {
  
//localStorage can take only string variable
  private theme:boolean;
  
  constructor() { }
  
  private _navItemSource = new BehaviorSubject<boolean>(localStorage['Theme'] ? JSON.parse(localStorage['Theme']) : false);
  
  // Observable navItem stream
  navItem$ = this._navItemSource.asObservable();
  
  //Change the theme
  onThemeClicked() {
    this.theme =!this.theme;
    localStorage['Theme'] = JSON.stringify(this.theme);
    this._navItemSource.next(this.theme);
  }
  
  getTheme(){
   return this.theme; 
  }
}
