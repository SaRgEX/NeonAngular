import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Manufacturer} from '../interfaces/manufacturer.interface';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  http = inject(HttpClient);
  baseApiUrl = 'https://localhost:7291/'

  constructor() { }

  getManufacturer() {
    return this.http.get<Manufacturer[]>(`${this.baseApiUrl}api/Manufacturer`)
  }

  deleteManufacturer(id: number) {
    return this.http.delete(`${this.baseApiUrl}api/Manufacturer/${id}`)
  }

  updateManufacturer(id: number, payload: { title: string }) {
    return this.http.patch(`${this.baseApiUrl}api/Manufacturer/${id}`, payload)
  }

  addManufacturer(payload: { title: string }) {
    return this.http.post(`${this.baseApiUrl}api/Manufacturer`, payload)
  }
}
