import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from '../models/sucursal';

@Injectable({
  providedIn: 'root'
})
export class CrearSucursalService {

  constructor(private http: HttpClient) {}

  crearSucursal(nuevaSucursal: Sucursal) {
    return this.http.post('https://localhost:7103/Sucursal092023/CreateSucursal', nuevaSucursal);
  }
}
