import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherForecastService } from 'src/app/get-weather-forecast.service';
import { ForecastData, StatisticsData } from 'src/app/app.interface';
import { calculateAverage } from 'src/app/utils/calculate-average.util';

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

      const modeTemp = this.calculateMode(filteredHours.map(forecast => forecast.main.temp));

      return {
        maxTemp,
        minTemp,
        meanTemp,
        modeTemp
      };
    }

    // move to util
    private calculateMode(numbers: number[]): number[] {

      const integers = numbers.map(num => Math.round(num));

      const modeMap = new Map<number, number>();
      integers.forEach(int => {
        if (modeMap.has(int)) {
          modeMap.set(int, modeMap.get(int) + 1);
        } else {
          modeMap.set(int, 1);
        }
      });

      const modeOccurences = Math.max(...modeMap.values());

      const modes: number[] = [];
      modeMap.forEach((val, key) => {
        if (val === modeOccurences) {
          modes.push(key);
        }
      });

      return modes;
    }

}
