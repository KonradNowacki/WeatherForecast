import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherForecastService } from 'src/app/get-weather-forecast.service';
import { PartOfDay } from 'src/app/app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public statisticsData: any;
  public dailyForecasts: any;

  private _dailyForecastsObservable: Observable<any>;

  constructor(
    private _weatherService: WeatherForecastService
  ) {
    this._dailyForecastsObservable = this._weatherService.getForecastObservable();
  }

    ngOnInit() {
      this.getForecast();
    }

    public onCitySelected(cityId: number): void {
      this._dailyForecastsObservable = this._weatherService.getForecastObservable(cityId);
      this.getForecast();
    }

    private getForecast(): void {
      this._dailyForecastsObservable.subscribe(el => {
        this.dailyForecasts = this.getFiveDayForecast(el);
        this.statisticsData = this.getStatisticsData(el);
      });
    }

    private getFiveDayForecast(list: any): any {

      const filteredHours = list.filter(forecast => [PartOfDay.morning, PartOfDay.day, PartOfDay.night].includes(forecast.dt_txt.split(' ')[1]));

      const fiveDayForecast = new Map<string, any>();

      filteredHours.forEach(dailyForecast => {
        const currentDay = dailyForecast.dt_txt.split(' ')[0];

        if (fiveDayForecast.has(currentDay)) {
          fiveDayForecast.set(currentDay, [...fiveDayForecast.get(currentDay), dailyForecast]);
        } else {
          fiveDayForecast.set(currentDay, [dailyForecast]);
        }

      });
      return Array.from(fiveDayForecast);
    }

    private getStatisticsData(list: any): any {
      const filteredHours = list.filter(forecast => [PartOfDay.morning, PartOfDay.day, PartOfDay.night].includes(forecast.dt_txt.split(' ')[1]));

      const maxTemp = Math.max(...filteredHours.map(forecast => forecast.main.temp_max));
      const minTemp = Math.min(...filteredHours.map(forecast => forecast.main.temp_min));
      const meanTemp = filteredHours.reduce((sum, increment) => sum + increment.main.temp, 0) / filteredHours.length;

      // TODO dodaj dominantę

      return {
        maxTemp,
        minTemp,
        meanTemp
      };
    }

}
