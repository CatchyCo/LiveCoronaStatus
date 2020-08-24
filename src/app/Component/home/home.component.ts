import { Component, OnInit } from '@angular/core';
import { LiveDataServiceService } from 'src/app/Services/live-data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts/public-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public liveDataService: LiveDataServiceService) { }
  totalConfirmCase = 0;
  totalDeathCases = 0;
  totalRecovered = 0;
  totalActive = 0;
  globalData;
  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ],
    options: { title: 'Graphical Representation' },
  };


  initChart() {
    const dataGraph = [];
    dataGraph.push(['Country', 'Confirm']);
    this.globalData.forEach(row => {
      //  console.log("SS" + row.totalConfirmCase );
      dataGraph.push([row.countryName, row.totalConfirmCase])
    });

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: dataGraph,
      options: { height: 500 },
    };

  }

  ngOnInit(): void {
    this.liveDataService.getGlobalData()
      .subscribe({
        next: (result) => {
          this.globalData = result;
          this.initChart();
          result.forEach(country => {
            if (country['countryName']) {
              this.totalConfirmCase = this.totalConfirmCase + country['totalConfirmCase'];
              this.totalDeathCases = this.totalDeathCases + country['totalDeath'];
              this.totalRecovered = this.totalRecovered + country['totalRecover'];
              this.totalActive = this.totalActive + country['active'];
            }
          })

        }

      });
  }
}

