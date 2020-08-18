import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecstService {

  constructor(
    private _http: HttpClient
  ) { }

// dodaj typy

  public getForecast(): any {
    this._http.get<any>('http://api.openweathermap.org/data/2.5/forecast?q=wroclaw&appid=cf33963b4e0a2aa9bca1fd938ce9b1d8').subscribe((data: any) => {
      console.log(data);
    });
  }
}
