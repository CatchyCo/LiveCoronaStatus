import { Component, OnInit } from '@angular/core';
import { LiveDataServiceService } from 'src/app/Services/live-data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public liveDataService: LiveDataServiceService) { }

  ngOnInit(): void {
    this.liveDataService.getGlobalData()
      .subscribe({
        next: (result) => {
          console.log(result);
        }
      });
  }

}
