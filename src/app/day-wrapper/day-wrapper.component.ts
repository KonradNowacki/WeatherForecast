import { Component, OnInit, Input } from '@angular/core';


export enum PartOfDay {
  morning = '06:00:00',
  day = '12:00:00',
  night = '21:00:00'
}

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

    this.morningTemperature = this.getTemperatureByPartOfDay('06:00:00');
    this.dailyTemperature = this.getTemperatureByPartOfDay('12:00:00');
    this.eveningTemperature = this.getTemperatureByPartOfDay('21:00:00');

  }

  public getTemperatureByPartOfDay(partOfDay: any) {

    // console.log(this.forecast[1])

    // const hour = forecast[1].dt_txt.split(' ')[1];

    // console.log(partOfDay)

    switch (partOfDay) {
      case '06:00:00':
        const morningForecast = this.forecast[1].filter(partOfDayForecast => partOfDayForecast.dt_txt.split(' ')[1] === '06:00:00');
        if (morningForecast.length) {
          return morningForecast[0].main.temp;
        }
        return;

      case '12:00:00':
        const dailyForecast = this.forecast[1].filter(partOfDayForecast => partOfDayForecast.dt_txt.split(' ')[1] === '12:00:00');
        console.log(dailyForecast)
        if (dailyForecast.length) {
          return dailyForecast[0].main.temp;
        }
        return;

      case '21:00:00':
        const eveningForecast = this.forecast[1].filter(partOfDayForecast => partOfDayForecast.dt_txt.split(' ')[1] === '21:00:00');
        console.log(eveningForecast)
        if (eveningForecast.length) {
          return eveningForecast[0].main.temp;
        }
        return;
    }
  }

}
