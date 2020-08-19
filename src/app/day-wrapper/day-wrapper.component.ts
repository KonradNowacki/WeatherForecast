import { Component, OnInit, Input } from '@angular/core';

import { PartOfDay } from './../app.interface';

// TODO Make onpush
@Component({
  selector: 'app-day-wrapper',
  templateUrl: './day-wrapper.component.html',
  styleUrls: ['./day-wrapper.component.scss']
})
export class DayWrapperComponent implements OnInit {

  @Input() public forecast: any;

  public morningTemperature: number;
  public dailyTemperature: number;
  public eveningTemperature: number;

  public humidity: number;

  ngOnInit(): void {
    this.morningTemperature = this.getTemperatureByPartOfDay(PartOfDay.morning);
    this.dailyTemperature = this.getTemperatureByPartOfDay(PartOfDay.day);
    this.eveningTemperature = this.getTemperatureByPartOfDay(PartOfDay.night);
    this.humidity = this.getAverageHumidity();
  }

  public getTemperatureByPartOfDay(partOfDay: PartOfDay): any {
    switch (partOfDay) {
      case PartOfDay.morning:
        const morningForecast = this.filterForecastByPartOfDay(PartOfDay.morning);
        return morningForecast.length ? morningForecast[0].main.temp : null;

      case PartOfDay.day:
        const dailyForecast = this.filterForecastByPartOfDay(PartOfDay.day);
        return dailyForecast.length ? dailyForecast[0].main.temp : null;

      case PartOfDay.night:
        const eveningForecast = this.filterForecastByPartOfDay(PartOfDay.night);
        return eveningForecast.length ? eveningForecast[0].main.temp : null;
    }
  }

  private filterForecastByPartOfDay(partOfDay: PartOfDay): any {
    return this.forecast[1].filter(partOfDayForecast => partOfDayForecast.dt_txt.split(' ')[1] === partOfDay);
  }

  // make more defensive
  // move calculating average to util
  private getAverageHumidity(): number {
    const humidities = this.forecast[1].map(partOfDayForecast => partOfDayForecast.main.humidity);
    const averageHumidity = humidities.reduce((sum, i) => sum + i, 0) / humidities.length;

    return averageHumidity;
  }

}
