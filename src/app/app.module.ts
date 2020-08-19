import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DayWrapperComponent } from './day-wrapper/day-wrapper.component';
import { WeatherForecastService } from './get-weather-forecast.service';
import { HttpClientModule } from '@angular/common/http';
import { StatisticsDataComponent } from './statistics-data/statistics-data.component';

@NgModule({
  declarations: [
    AppComponent,
    DayWrapperComponent,
    StatisticsDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    WeatherForecastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
