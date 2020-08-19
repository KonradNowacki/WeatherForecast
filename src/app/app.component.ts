import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherForecastService } from 'src/app/get-weather-forecast.service';
import { PartOfDay, ForecastData, StatisticsData } from 'src/app/app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public statisticsData: any;
  public dailyForecasts: any;

  private readonly _partOfDayHours: string[] = ['06:00:00', '12:00:00', '21:00:00'];

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

    private getFiveDayForecast(list: ForecastData[]): any {

      const filteredHours = list.filter(forecast => this._partOfDayHours.includes(forecast.dt_txt.split(' ')[1]));

      const fiveDayForecast = new Map<string, ForecastData[]>();

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

    private getStatisticsData(list: ForecastData[]): StatisticsData {
      const filteredHours = list.filter(forecast => this._partOfDayHours.includes(forecast.dt_txt.split(' ')[1]));

      const maxTemp = Math.max(...filteredHours.map(forecast => forecast.main.temp_max));
      const minTemp = Math.min(...filteredHours.map(forecast => forecast.main.temp_min));
      const meanTemp = filteredHours.reduce((sum, increment) => sum + increment.main.temp, 0) / filteredHours.length;

      const modeTemp = this.calculateMode(filteredHours.map(forecast => forecast.main.temp));

      // TODO dodaj dominantę

      return {
        maxTemp,
        minTemp,
        meanTemp,
        modeTemp
      };
    }

    private calculateMode(numbers: number[]): number[] {

      // Considering integers only to make it more likely to find the mode
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

      console.log(modes);

      return modes;
    }

}
