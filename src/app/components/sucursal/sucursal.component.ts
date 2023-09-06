import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListarSucursalService } from 'src/app/services/listar-sucursal.service';
import { ListarMonedaService } from 'src/app/services/listar-moneda.service';
import { CrearSucursalService } from 'src/app/services/crear-sucursal.service';
import { EditSucursalService } from 'src/app/services/edit-sucursal.service';
import { Sucursal } from 'src/app/models/sucursal';
import { Moneda } from 'src/app/models/moneda';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent {

  nuevaSucursal: Sucursal = new Sucursal();

  constructor(private servSucursal: ListarSucursalService,
              private servMoneda: ListarMonedaService,
              private servCreaSuc: CrearSucursalService,
              private servEditSuc: EditSucursalService) {}

  ngOnInit() {
    this.obtenerMonedas();
    this.obtenerSucursales();
  }

  obtenerMonedas() {
    this.servMoneda.obtenerMonedas().subscribe((datos: any[]) => {
      this.llenarComboMoneda(datos);
    });
  }

  obtenerSucursales() {
    this.servSucursal.obtenerSucursales().subscribe((datos: any[]) => {
      this.llenarTabla(datos);
    });
  }

  llenarComboMoneda(datos: Moneda[]) {
    const selectMoneda = document.getElementById('codigoMoneda');
    if (selectMoneda == null)
    return;
    selectMoneda.innerHTML = '';

    datos.forEach((dato) => {
      const newOption = document.createElement('option');
      newOption.value = dato.codigoMoneda.toString();
      this.nuevaSucursal.codigoMoneda = Number(dato.codigoMoneda);
      newOption.textContent = dato.descripcion;
      selectMoneda.appendChild(newOption);
    });
  }

  actualizarCodigoMoneda(event: any) {
    const selectedValue = event.target.value;
    this.nuevaSucursal.codigoMoneda = parseInt(selectedValue, 10);
  }
  

  llenarTabla(datos: any[]) {
    const tablaBody = document.getElementById('tabla-body');
    if (tablaBody == null)
    return;
    tablaBody.innerHTML = '';

    datos.forEach((dato) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
      <td>${dato.codigo}</td>  
      <td>${dato.descripcion}</td>
      <td>${dato.direccion}</td>
      <td>${dato.identificacion}</td>
      <td>${dato.codigoMoneda}</td>
      <td>${dato.monedaNombre}</td>
      <td>${dato.fechaCreacion}</td>
      <td>${dato.fechaModificacion}</td>
      <td>
        <button id="btn_sel" class="btn btn-success" data-id="${dato.codigo}">
        <i class="fa fa-check"></i> Seleccionar
      </button>
      </td>
      `;
      const btnEditar = newRow.querySelector('#btn_sel');
    if (btnEditar) {
      btnEditar.addEventListener('click', () => {
        this.editarRegistro(dato);
      });
    }

      tablaBody.appendChild(newRow);
    });
  }

  guardarSucursal() {
    this.servCreaSuc.crearSucursal(this.nuevaSucursal).subscribe((respuesta) => {
      console.log(respuesta);
      this.obtenerSucursales();
    });
  }

  editarRegistro(registro: Sucursal) {
    this.nuevaSucursal = {
      codigo: registro.codigo,
      descripcion: registro.descripcion,
      direccion: registro.direccion,
      identificacion: registro.identificacion,
      fechaCreacion: null,
      codigoMoneda: registro.codigoMoneda,
      esBorrado: registro.esBorrado,
      fechaModificacion: null,
      codigoMonedaNavigation: null,
    };
  }

  editSucursal() {
    this.servEditSuc.editSucursal(this.nuevaSucursal).subscribe((respuesta) => {
      console.log(respuesta);
      this.obtenerSucursales();
    });
  }

  limpiarCampos() {
    this.nuevaSucursal = new Sucursal();
  }

  deleteRegistro(registro: Sucursal) {
    this.nuevaSucursal = {
      codigo: registro.codigo,
      descripcion: registro.descripcion,
      direccion: registro.direccion,
      identificacion: registro.identificacion,
      fechaCreacion: null,
      codigoMoneda: registro.codigoMoneda,
      esBorrado: true,
      fechaModificacion: null,
      codigoMonedaNavigation: null,
    };
    this.editSucursal();
  }
  
}
