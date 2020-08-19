import { Component, Input } from '@angular/core';

import { StatisticsData } from 'src/app/app.interface';

@Component({
  selector: 'app-statistics-data',
  templateUrl: './statistics-data.component.html',
  styleUrls: ['./statistics-data.component.scss']
})
export class StatisticsDataComponent {

  @Input() public statistics: StatisticsData;
}
