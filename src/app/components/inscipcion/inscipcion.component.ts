import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from 'src/app/models/cliente';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Precio } from 'src/app/models/precio';
import { PreciosComponent } from '../precios/precios.component';

@Component({
  selector: 'app-inscipcion',
  templateUrl: './inscipcion.component.html',
  styleUrls: ['./inscipcion.component.scss']
})
export class InscipcionComponent implements OnInit {

  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  precios: Precio[] = new Array<Precio>();
  precioSeleccionado: Precio = new Precio();

  constructor( private db:AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('precios').get().subscribe((result)=>{
      result.docs.forEach((item)=>{
        let precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref; 
        this.precios.push(precio)
        
      })
    })
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

  seleccionarPrecio(id: string){
    this.precioSeleccionado = this.precios.find(x => x.id == id)
    this.inscripcion.precios = this.precioSeleccionado.ref
  }

}
