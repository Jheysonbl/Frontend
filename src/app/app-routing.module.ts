import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucursalComponent } from './components/sucursal/sucursal.component';

const routes: Routes = [
   { path: '', redirectTo: '/sucursal', pathMatch: 'full' }, // Redirige la ruta raíz a listar-sucursales
  { path: 'sucursal', component: SucursalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
