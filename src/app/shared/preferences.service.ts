import { Injectable } from '@angular/core';

@Injectable()
export class PreferencesService {


  public getPrefBoolean(page: string, key: string): boolean {
    return JSON.parse(window.localStorage.getItem(page + '.' + key)) || false;
  }

  public setPrefBoolean(page: string, key: string, val: boolean): void {
    return window.localStorage.setItem(page + '.' + key, JSON.stringify(val));
  }

  constructor() { }
}
