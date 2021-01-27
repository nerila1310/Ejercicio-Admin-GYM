import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Inscripcion } from 'src/app/models/inscripcion';

@Component({
  selector: 'app-inscipcion',
  templateUrl: './inscipcion.component.html',
  styleUrls: ['./inscipcion.component.scss']
})
export class InscipcionComponent implements OnInit {

  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();

  constructor() { }

  ngOnInit(): void {
  }

  asignarCliente(cliente:Cliente){
    this.inscripcion.cliente = cliente.ref
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente(){
    this.clienteSeleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }

  guardar(){
    console.log(this.inscripcion)
  }

}
