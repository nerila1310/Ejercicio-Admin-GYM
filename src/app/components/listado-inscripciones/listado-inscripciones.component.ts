import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from 'src/app/models/inscripcion';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {

  inscripciones: any[] = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {

    this.inscripciones.length = 0;
    this.db.collection('inscripciones').get().subscribe((result)=>{
      result.forEach((item)=>{
        let inscripcionesObj = item.data();
        inscripcionesObj.id = item.id;

        this.db.doc(item.data().cliente.path).get().subscribe((cliente)=>{
          inscripcionesObj.clienteObtenido = cliente.data();
          inscripcionesObj.fecha = new Date(inscripcionesObj.fecha.seconds * 1000)
          inscripcionesObj.fechaFinal = new Date(inscripcionesObj.fechaFinal.seconds * 1000)
          this.inscripciones.push(inscripcionesObj);
        })
      })
    })

  }

}
