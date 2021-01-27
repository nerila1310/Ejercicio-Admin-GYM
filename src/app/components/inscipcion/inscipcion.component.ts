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
    if(this.inscripcion.validar().esValido){
      console.log('Guardando....') 
    }else{
      console.log(this.inscripcion.validar().mensaje)
    }
  }

  seleccionarPrecio(id: string){

    if(id != 'null'){

      this.precioSeleccionado = this.precios.find(x => x.id == id)
      this.inscripcion.precios = this.precioSeleccionado.ref
      this.inscripcion.fecha = new Date();
  
      this.inscripcion.subtotal = this.precioSeleccionado.costo;
      this.inscripcion.impuesto = this.inscripcion.subtotal * 0.16;
      this.inscripcion.total = this.inscripcion.subtotal + this.inscripcion.impuesto;
  
      if(this.precioSeleccionado.tipo == 1){
  
        let dias: number = this.precioSeleccionado.duracion * 1;
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate()+dias)
        this.inscripcion.fechaFinal = fechaFinal;
      }
  
      if(this.precioSeleccionado.tipo == 2){
  
        let dias: number = this.precioSeleccionado.duracion * 7;
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate()+dias)
        this.inscripcion.fechaFinal = fechaFinal;
      }
  
      if(this.precioSeleccionado.tipo == 3){
  
        let dias: number = this.precioSeleccionado.duracion * 15;
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate()+dias)
        this.inscripcion.fechaFinal = fechaFinal;
      }
  
      if(this.precioSeleccionado.tipo == 4){
  
        let mesAgrega: number = this.precioSeleccionado.duracion;
        let anio: number = this.inscripcion.fecha.getFullYear()
        let mes: number = this.inscripcion.fecha.getMonth() + mesAgrega
        let dia: number = this.inscripcion.fecha.getDate()
  
        let fechaFinal = new Date(anio, mes , dia )
        this.inscripcion.fechaFinal = fechaFinal;
      }
  
      if(this.precioSeleccionado.tipo == 5){
  
        let anioAgrega: number = this.precioSeleccionado.duracion * 1;
        let mes: number = this.inscripcion.fecha.getMonth() 
        let dia: number = this.inscripcion.fecha.getDate()
  
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear() + anioAgrega , mes , dia )
        this.inscripcion.fechaFinal = fechaFinal;
  
      }
    }else{
      this.precioSeleccionado = new Precio();

      this.inscripcion.precios = null;
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinal = null;
      this.inscripcion.subtotal = 0;
      this.inscripcion.impuesto = 0;
      this.inscripcion.total = 0;
    }
  }
}