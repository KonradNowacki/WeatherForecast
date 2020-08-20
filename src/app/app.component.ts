import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherForecastService } from 'src/app/get-weather-forecast.service';
import { ForecastData, StatisticsData } from 'src/app/app.interface';
import { calculateAverage } from 'src/app/utils/calculate-average.util';
import { calculateMode } from 'src/app/utils/calculate-mode.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public statisticsData: StatisticsData;
  public dailyForecasts: ForecastData[][];

  private readonly _partOfDayHours: string[] = ['06:00:00', '12:00:00', '21:00:00'];

  private _dailyForecastsObservable: Observable<ForecastData[]>;

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

    private getFiveDayForecast(list: ForecastData[]): ForecastData[][] {

      const filteredHours = list.filter(forecast => this._partOfDayHours.includes(forecast.dt_txt.split(' ')[1]));

      const fiveDayForecastMap = new Map<string, ForecastData[]>();

      filteredHours.forEach(dailyForecast => {
        const currentDay = dailyForecast.dt_txt.split(' ')[0];

        if (fiveDayForecastMap.has(currentDay)) {
          fiveDayForecastMap.set(currentDay, [...fiveDayForecastMap.get(currentDay), dailyForecast]);
        } else {
          fiveDayForecastMap.set(currentDay, [dailyForecast]);
        }

      });

      const fiveDayForecast = Array.from(fiveDayForecastMap).map(forecast => forecast[1]);

      return fiveDayForecast;
    }

    private getStatisticsData(list: ForecastData[]): StatisticsData {
      const filteredHours = list.filter(forecast => this._partOfDayHours.includes(forecast.dt_txt.split(' ')[1]));

      const maxTemp = Math.max(...filteredHours.map(forecast => forecast.main.temp_max));
      const minTemp = Math.min(...filteredHours.map(forecast => forecast.main.temp_min));

      const filteredHoursTemps = filteredHours.map(forecast => forecast.main.temp);
      const meanTemp = calculateAverage(filteredHoursTemps);
      const modeTemp = calculateMode(filteredHoursTemps);

      return {
        maxTemp,
        minTemp,
        meanTemp,
        modeTemp
      };
    }

}
