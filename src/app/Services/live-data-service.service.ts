import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiveDataServiceService {


  globalDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-23-2020.csv';
  globalData;
  constructor(public http: HttpClient) { }

  getGlobalData() {
    return this.http.get(this.globalDataURL, { responseType: 'text' }).pipe(
      map(
        (result) => {

          let rows = result.split('\n');
          rows = rows.splice(0);
          console.log(rows[0]);
          //  return result;
        }
      )
    );
  }
}
