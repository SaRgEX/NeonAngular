import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Forecast } from '../interfaces/forecast.interface';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  http = inject(HttpClient);
  baseApiUrl = 'https://localhost:7291/'

  constructor() { }

  getForecast() {
    return this.http.get<Forecast[]>(`${this.baseApiUrl}api/Forecasting`)
  }
}
