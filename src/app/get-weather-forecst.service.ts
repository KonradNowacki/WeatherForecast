import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecstService {

  constructor() { }

  public getForecast(): any {
    console.log('gettin forecast');
  }
}
