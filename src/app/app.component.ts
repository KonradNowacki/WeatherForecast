import { Component, OnInit } from '@angular/core';
import { WeatherForecstService } from 'src/app/get-weather-forecst.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WeatherForecast';

  constructor(
    private _weatherService: WeatherForecstService
  ) {}

    ngOnInit() {
      this._weatherService.getForecast();
    }

}
