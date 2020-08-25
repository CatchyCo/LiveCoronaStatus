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
  dataGraph = [];
  count = 0;

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
          this.initChart();
        }
      });
  }

  initChart() {
    //  this.dataGraph.push(['Country', 'Confirm']);
    this.globalData.forEach(row => {
      if (row.totalConfirmCase) {
        this.dataGraph.push([row.countryName, row.totalConfirmCase])
      }
    });
    console.log(this.dataGraph);
  }

}

