import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalData } from '../global-data';


@Injectable({
  providedIn: 'root'
})
export class LiveDataServiceService {


  globalDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-23-2020.csv';
  finalData: GlobalData[] = [];

  constructor(public http: HttpClient) { }


  getGlobalData() {
    return this.http.get(this.globalDataURL, { responseType: 'text' }).pipe(

      map(result => {
        let globalData: GlobalData[] = [];
        const rows = result.split('\n');
        rows.splice(0, 1);
        rows.forEach(row => {
          const col = row.split(/,(?=\S)/);
          if (parseInt(col[7]) != NaN) {
            globalData.push({
              countryName: col[3],
              totalConfirmCase: +col[7],
              totalDeath: +col[8],
              totalRecover: +col[9],
              active: +col[9]
            })
          }
        });
        this.getFinalData(globalData);
        // return result;
      })
    );
  }

  getFinalData(globalData: GlobalData[]) {
    globalData.forEach(data => (
      console.log(data)
    )

    )
  }


}
