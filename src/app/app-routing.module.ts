import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';

const routes: Routes = [
  {path: 'listado-clientes', component: ListadoClientesComponent},
  {path: 'agregar-cliente', component:AgregarClienteComponent},
  {path: 'agregar-cliente/:clienteID', component:AgregarClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
