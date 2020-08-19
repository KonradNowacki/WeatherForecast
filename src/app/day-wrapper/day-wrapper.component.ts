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

  public humidity: any;

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
        if (morningForecast.length) {
          return morningForecast[0].main.temp;
        }
        return;

      case PartOfDay.day:
        const dailyForecast = this.filterForecastByPartOfDay(PartOfDay.day);
        // console.log(dailyForecast)
        if (dailyForecast.length) {
          return dailyForecast[0].main.temp;
        }
        return;

      case PartOfDay.night:
        const eveningForecast = this.filterForecastByPartOfDay(PartOfDay.night);
        // console.log(eveningForecast)
        if (eveningForecast.length) {
          return eveningForecast[0].main.temp;
        }
        return;
    }
  }

  private filterForecastByPartOfDay(partOfDay: PartOfDay): any {
    return this.forecast[1].filter(partOfDayForecast => partOfDayForecast.dt_txt.split(' ')[1] === partOfDay);
  }

  // make more defensive
  private getAverageHumidity(): any {
    const humidities = this.forecast[1].map(partOfDayForecast => partOfDayForecast.main.humidity);
    const averageHumidity = humidities.reduce((sum, i) => sum + i) / humidities.length;

    return averageHumidity;
  }

}
