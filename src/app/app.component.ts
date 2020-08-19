import { Component, OnInit } from '@angular/core';

import { WeatherForecastService } from 'src/app/get-weather-forecast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public dailyForecasts: any;
  public dailyForecastsObservable: Observable<any>;

  constructor(
    private _weatherService: WeatherForecastService
  ) {
    this.dailyForecastsObservable = this._weatherService.getForecastObservable();
  }

    ngOnInit() {
      this.dailyForecastsObservable.subscribe(el => {
        this.dailyForecasts = this.getFiveDayForecast(el);
      });
    }

    public getFiveDayForecast(list: any): any {

      const filteredHours = list.filter(forecast => ['06:00:00', '12:00:00', '21:00:00'].includes(forecast.dt_txt.split(' ')[1]));

      const fiveDayForecast = new Map<any, any>();

      filteredHours.forEach(dailyForecast => {
        const currentDay = dailyForecast.dt_txt.split(' ')[0];
        // console.log(currentDay);

        if (fiveDayForecast.has(currentDay)) {
          fiveDayForecast.set(currentDay, [...fiveDayForecast.get(currentDay), dailyForecast]);
        } else {
          fiveDayForecast.set(currentDay, [dailyForecast]);
        }

      });
      // console.log(fiveDayForecast);
      return Array.from(fiveDayForecast);
    }

}
