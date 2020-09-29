import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SpaceX-Launches';
  data;
  selectedYear = '';
  successfulLaunch;
  successfulLanding;
  dataLoader = false;
  baseUrl = 'https://api.spaceXdata.com/v3/launches?limit=100';

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.dataLoader = true;
    this.dataService.get(this.baseUrl)
      .subscribe(res => {
        this.dataLoader = false;
        this.data = res;
    });
  }

  selectFilter(e, filterSelected) {
    e.stopPropagation();
    switch (filterSelected) {
      case 'launch_year':
        this.selectedYear = e.target.dataset.value;
        break;
      case 'launch_success':
        this.successfulLaunch = e.target.dataset.value;
        break;
      case 'launch_landing':
        this.successfulLanding = e.target.dataset.value;
        break;
      default:
        break;
    }
    this.getData(filterSelected, e.target.dataset.value);
  }

  getData(filterSelected, value) {
    this.dataLoader = true;
    if (this.baseUrl.includes(filterSelected)) {
      const temp = this.baseUrl.split(filterSelected + '=');
      if (temp[1].indexOf('&') !== -1) {
        const partURL = temp[1].slice(temp[1].indexOf('&'));
        this.baseUrl = temp[0] + filterSelected + '=' + value + partURL;
      } else {
        this.baseUrl = temp[0] + filterSelected + '=' + value;
      }
    } else {
      this.baseUrl = this.baseUrl + '&' + filterSelected + '=' + value;
    }
    this.dataService.get(this.baseUrl).subscribe(res => {
      this.dataLoader = false;
      this.data = JSON.parse(JSON.stringify(res));
    })
  }
}
