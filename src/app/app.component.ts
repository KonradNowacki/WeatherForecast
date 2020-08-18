import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from 'src/app/get-weather-forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WeatherForecast';

  constructor(
    private _weatherService: WeatherForecastService
  ) {}

    ngOnInit() {
      this._weatherService.getForecast();
    }

}
