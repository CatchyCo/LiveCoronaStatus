import { Component, OnInit } from '@angular/core';
import { LiveDataServiceService } from 'src/app/Services/live-data-service.service';

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

  ngOnInit(): void {
    this.liveDataService.getGlobalData()
      .subscribe({
        next: (result) => {
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
