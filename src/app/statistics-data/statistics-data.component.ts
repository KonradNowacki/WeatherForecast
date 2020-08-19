import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistics-data',
  templateUrl: './statistics-data.component.html',
  styleUrls: ['./statistics-data.component.scss']
})
export class StatisticsDataComponent implements OnInit {

  @Input() public statistics: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.statistics);
  }

}
