import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListarSucursalService {

  constructor(private http: HttpClient) {}

  obtenerSucursales(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7103/Sucursal092023/GetSucursal');
  }
}
