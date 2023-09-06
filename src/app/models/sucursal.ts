export class Sucursal {
    codigo: number;
    descripcion: string;
    direccion: string;
    identificacion: string;
    fechaCreacion : string | null;
    codigoMoneda: number;
    esBorrado: boolean;
    fechaModificacion: string | null;
    codigoMonedaNavigation: null | any; 

    constructor() {
        this.codigo = 0;
        this.descripcion = '';
        this.direccion = '';
        this.identificacion = '';
        this.fechaCreacion = null;
        this.codigoMoneda = 0;
        this.esBorrado = false;
        this.fechaModificacion = null;
        this.codigoMonedaNavigation = null;
      }
}  