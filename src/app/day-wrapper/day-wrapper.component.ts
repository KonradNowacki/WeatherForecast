import { Component, OnInit, Input } from '@angular/core';

// TODO Make onpush
@Component({
  selector: 'app-day-wrapper',
  templateUrl: './day-wrapper.component.html',
  styleUrls: ['./day-wrapper.component.scss']
})
export class DayWrapperComponent implements OnInit {

  @Input() public forecast: any;

  public morningTemperature: any;
  public dailyTemperature: any;
  public eveningTemperature: any;

  constructor() { 
    
  }

  ngOnInit(): void {
    // console.log(this.forecast[1]);

    this.morningTemperature = this.getTemperatureByPartOfDay(this.forecast, '06:00:00');

  }

  public getTemperatureByPartOfDay(forecast: any, partOfDay: any) {

    console.log(forecast[1])

    // const hour = forecast[1].dt_txt.split(' ')[1];

    console.log()

    switch (partOfDay) {
      case '06:00:00':
        return 3
    }
  }

}
