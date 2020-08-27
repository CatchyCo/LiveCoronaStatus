import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalData } from '../global-data';
import { global } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LiveDataServiceService {

  globalDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-27-2020.csv';
  globalDataURLfinal = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
  row = {};
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
    'Nov', 'Dec'];

  finalMonth: any;
  day = new Date().toDateString().split(' ')[2]

  constructor(public http: HttpClient) { }
  getGlobalData(): Observable<any> {

    const date = new Date().toDateString();

    let monthInWord = new Date().toDateString().split(' ')[1];

    let monthNumber = this.months.indexOf(monthInWord) + 1;

    let finalYear = new Date().toDateString().split(' ')[3];

    if (date.split(' ')[2].length % 10 == 0) {
      this.day = '0' + date.split(' ')[2].length % 10;
    }

    if (monthNumber.toString().length == 1) {
       this.finalMonth = '0' + monthNumber.toString();
       monthNumber = this.finalMonth;
    }

    let finalDate= (monthNumber+'-'+this.day+'-'+finalYear+'.csv');
    console.log((this.globalDataURLfinal+finalDate) == this.globalDataURL);


    return this.http.get(this.globalDataURL, { responseType: 'text' }).pipe(

      map(result => {
        const globalData: GlobalData[] = [];
        const rows = result.split('\n');
        const raw = {};
        rows.splice(0, 1);

        rows.forEach(row => {
          const col = row.split(/,(?=\S)/);
          if (parseInt(col[7]) != NaN) {
            const cs = {
              countryName: col[3],
              totalConfirmCase: +col[7],
              totalDeath: +col[8],
              totalRecover: +col[9],
              active: +col[10]
            }
            const temp: GlobalData = raw[cs.countryName];
            if (temp) {
              temp.active = cs.active + temp.active;
              temp.totalConfirmCase = cs.totalConfirmCase + temp.totalConfirmCase;
              temp.totalDeath = cs.totalDeath + temp.totalDeath;
              temp.totalRecover = cs.totalRecover + temp.totalRecover;
              raw[cs.countryName] = temp;
              //  console.log(temp);
            } else {
              raw[cs.countryName] = cs;
            }
          }
        });
        return (Object.values(raw));
      })
    );
  }

}
