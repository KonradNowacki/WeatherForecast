import { Component, OnInit, Input } from '@angular/core';

import { StatisticsData } from 'src/app/app.interface';

@Component({
  selector: 'app-statistics-data',
  templateUrl: './statistics-data.component.html',
  styleUrls: ['./statistics-data.component.scss']
})
export class StatisticsDataComponent implements OnInit {

  @Input() public statistics: StatisticsData;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.statistics);
  }

}
