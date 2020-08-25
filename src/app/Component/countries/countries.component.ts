
import { Component, OnInit } from '@angular/core';
import { LiveDataServiceService } from 'src/app/Services/live-data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  totalConfirmCase = 0;
  totalDeathCases = 0;
  totalRecovered = 0;
  totalActive = 0;
  globalData;
  countrie = [];

  constructor(public liveDataService: LiveDataServiceService) { }
  ngOnInit(): void {
    this.liveDataService.getGlobalData()
      .subscribe({
        next: (result) => {
          this.globalData = result;
          result.forEach(country => {
            if (country['countryName']) {
              /*              this.totalConfirmCase = this.totalConfirmCase + country['totalConfirmCase'];
                           this.totalDeathCases = this.totalDeathCases + country['totalDeath'];
                           this.totalRecovered = this.totalRecovered + country['totalRecover'];
                           this.totalActive = this.totalActive + country['active']; */
              this.countrie.push(country['countryName']);
            }
          })
          this.updateValue('Afghanistan');
        }
      });
  }

  updateValue(value) {
    console.log(this.globalData);
    this.globalData.forEach(data => {
      if (data['countryName'] == value) {
        this.totalConfirmCase = data['totalConfirmCase'];
        this.totalDeathCases = data['totalDeath'];
        this.totalRecovered = data['totalRecover'];
        this.totalActive = data['active'];
      }

    });

  }


}