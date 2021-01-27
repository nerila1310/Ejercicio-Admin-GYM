import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {

  constructor( private db: AngularFirestore) { }

  clientes: Cliente[] = new Array<Cliente>();

  ngOnInit(): void {
    this.db.collection<any>('clientes').get().subscribe((result)=>{
      this.clientes.length = 0;
      result.docs.forEach((item)=>{
        let cliente: any= item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        this.clientes.push(cliente);
      })
    })
  }

}
