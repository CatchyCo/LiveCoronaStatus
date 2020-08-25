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

  globalDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-23-2020.csv';
  row = {};
  constructor(public http: HttpClient) { }
  getGlobalData(): Observable<any> {
    return this.http.get(this.globalDataURL, { responseType: 'text' }).pipe(

      map(result => {
        let globalData: GlobalData[] = [];
        const rows = result.split('\n');
        let raw = {};
        rows.splice(0, 1);

        rows.forEach(row => {
          const col = row.split(/,(?=\S)/);
          if (parseInt(col[7]) != NaN) {
            let cs = {
              countryName: col[3],
              totalConfirmCase: +col[7],
              totalDeath: +col[8],
              totalRecover: +col[9],
              active: +col[10]
            }
            let temp: GlobalData = raw[cs.countryName];
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
