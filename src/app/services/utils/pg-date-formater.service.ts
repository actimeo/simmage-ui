import { Injectable } from '@angular/core';

@Injectable()
export class PgDateFormaterService {

  constructor() { }

  formatDateTime(value: string) {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    //let tz = date.getTimezoneOffset();

    return (day < 10 ? '0' : '') + day
            + '/' + (month < 10 ? '0' : '') + month
            + '/' + year
            + ' ' + (hours < 10 ? '0' : '') + hours
            + ':' + (minutes < 10 ? '0' : '') + minutes
            + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  formatDate(value: string) {
    if (value === null) { return null ; }

    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return (day < 10 ? '0' : '') + day
            + '/' + (month < 10 ? '0' : '') + month
            + '/' + year;
  }

}