import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { InscipcionComponent } from './components/inscipcion/inscipcion.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { PreciosComponent } from './components/precios/precios.component';

const routes: Routes = [
  {path:'', redirectTo:'inscripcion', pathMatch: 'full'},
  {path:'inscripcion', component:InscipcionComponent},
  {path: 'listado-clientes', component: ListadoClientesComponent},
  {path: 'agregar-cliente', component:AgregarClienteComponent},
  {path: 'agregar-cliente/:clienteID', component:AgregarClienteComponent},
  {path: 'precios', component:PreciosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
