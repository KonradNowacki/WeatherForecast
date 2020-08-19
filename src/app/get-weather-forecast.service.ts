import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {


  public forecastObservable: Observable<any>;

  constructor(
    private _http: HttpClient
  ) { }

  public getForecastObservable(): any {
    return this._http.get<any>('http://api.openweathermap.org/data/2.5/forecast?q=wroclaw&appid=cf33963b4e0a2aa9bca1fd938ce9b1d8')
    .pipe(
      take(1),
      map(data => data.list)
    );
  }

}
