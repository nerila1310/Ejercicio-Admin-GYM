import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  formularioPrecio!: FormGroup;
  precios: any[] = new Array<any>();

  constructor(private fb: FormBuilder, 
              private db: AngularFirestore,
              private msj: MensajesService) { }

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipo: ['', Validators.required]
    })

    this.db.collection('precios').get().subscribe((result)=>{
      result.docs.forEach((dato)=>{
        let precio = dato.data();
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio)
      });
    })

  }

  agregar(){
    this.db.collection('precios').add(this.formularioPrecio.value).then((result)=>{
      this.msj.mensajeCorrecto('Agregado', 'Agregado correctamente')
      this.formularioPrecio.reset()
    }).catch(()=>{
      this.msj.mensajeError('Error', 'Error al agregar precio')
    })
  }

}
