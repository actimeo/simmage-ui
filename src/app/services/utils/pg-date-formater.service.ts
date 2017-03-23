import { Injectable } from '@angular/core';

@Injectable()
export class PgDateFormaterService {

  constructor() { }

  formatDateTime(value: string) {
    let date = new Date(value);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    //let tz = date.getTimezoneOffset();

    return (day < 10 ? "0" : '') + day
            + "/" + (month < 10 ? "0" : '') + month
            + "/" + year
            + " " + (hours < 10 ? "0" : '') + hours
            + ":" + (minutes < 10 ? "0" : '') + minutes
            + ":" + (seconds < 10 ? "0" : '') + seconds;
  }

  formatDate(value: string) {
    if (value === null) { return null ;}

    let date = new Date(value);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return (day < 10 ? "0" : '') + day
            + "/" + (month < 10 ? "0" : '') + month
            + "/" + year;
  }

}