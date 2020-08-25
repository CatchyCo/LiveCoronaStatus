import { Component, OnInit } from '@angular/core';
import { LiveDataServiceService } from 'src/app/Services/live-data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmCase = 0;
  totalDeathCases = 0;
  totalRecovered = 0;
  totalActive = 0;
  globalData;
  datatable = [];
  datatable2 = [];
  colGraph = [];
  chart = {
    pieChart: 'PieChart',
    columnChart: 'ColumnChart',
    height: 500,
    options: {
      animation: {
        duration: 500,
        easing: 'in',
      },
    }
  }

  constructor(public liveDataService: LiveDataServiceService) { }
  ngOnInit(): void {
    this.liveDataService.getGlobalData()
      .subscribe({
        next: (result) => {
          this.globalData = result;
          result.forEach(country => {
            if (country['countryName']) {
              this.totalConfirmCase = this.totalConfirmCase + country['totalConfirmCase'];
              this.totalDeathCases = this.totalDeathCases + country['totalDeath'];
              this.totalRecovered = this.totalRecovered + country['totalRecover'];
              this.totalActive = this.totalActive + country['active'];
            }
          })
          this.initChart("Confirm");
        }
      });
  }

  initChart(caseType: string) {

    this.datatable = [];
    this.datatable2 = [];
    // this.datatable.push(["Country", "Cases"])

    this.globalData.forEach(cs => {
      let value: number;
      if (caseType == 'Confirm') {
        if (cs.totalConfirmCase > 2000) {
          value = cs.totalConfirmCase
      }
        }

      if (caseType === 'Active') {
        if (cs.active > 2000) {
          value = cs.active
      }
        }
      if (caseType === 'Death') {
        if (cs.totalDeath > 1000) {
          value = cs.totalDeath
      }
        }
      if (caseType === 'Recovered') {
        if (cs.totalRecover > 2000) {
          value = cs.totalRecover
      }
        }
      this.datatable.push([
        cs.countryName, value
      ])
      this.datatable2.push([
        cs.countryName, value
      ])
    })

  }
  updateChart(value) {
    this.initChart(value);
  }


}



