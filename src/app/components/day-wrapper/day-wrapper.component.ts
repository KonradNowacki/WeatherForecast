import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { PartOfDay, ForecastData } from 'src/app/app.interface';
import { calculateAverage } from 'src/app/utils/calculate-average.util';
@Component({
  selector: 'app-day-wrapper',
  templateUrl: './day-wrapper.component.html',
  styleUrls: ['./day-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayWrapperComponent implements OnInit {

  @Input() public forecast: ForecastData[];
  @Input() public isToday: boolean;

  public morningTemperature: number;
  public dailyTemperature: number;
  public nightTemperature: number;
  public humidity: number;

  public todayDate: string;

  ngOnInit(): void {
    this.morningTemperature = this.getTemperatureByPartOfDay(PartOfDay.morning);
    this.dailyTemperature = this.getTemperatureByPartOfDay(PartOfDay.day);
    this.nightTemperature = this.getTemperatureByPartOfDay(PartOfDay.night);
    this.humidity = this.getAverageHumidity();

    this.todayDate = this.forecast[0].dt_txt.split(' ')[0];
  }

  public getTemperatureByPartOfDay(partOfDay: PartOfDay): number {
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

  private filterForecastByPartOfDay(partOfDay: PartOfDay): ForecastData[] {
    return this.forecast.filter(partOfDayForecast => partOfDayForecast.dt_txt.split(' ')[1] === partOfDay);
  }

  private getAverageHumidity(): number {
    const humidities = this.forecast.map(partOfDayForecast => partOfDayForecast.main.humidity);
    const averageHumidity = calculateAverage(humidities);

    return averageHumidity;
  }

}
