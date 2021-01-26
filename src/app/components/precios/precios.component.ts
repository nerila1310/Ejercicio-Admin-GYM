import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from 'src/app/models/precio';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  formularioPrecio!: FormGroup;
  precios: Precio[] = new Array<Precio>();
  esEditable: boolean = false;
  id!: string;

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

    this.listadoPrecios()
  }

  listadoPrecios(){
    this.db.collection<Precio>('precios').get().subscribe((result)=>{
      this.precios.length = 0;
      result.docs.forEach((dato)=>{
        let precio = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio)
      });
    })
  }

  agregar(){
    this.db.collection<Precio>('precios').add(this.formularioPrecio.value).then((result)=>{
      this.msj.mensajeCorrecto('Agregado', 'Agregado correctamente')
      this.formularioPrecio.reset();
      this.listadoPrecios();
    }).catch(()=>{
      this.msj.mensajeError('Error', 'Error al agregar precio')
    })
  }

  mostrarPrecio(precio: Precio){
    this.esEditable = true;
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipo: precio.tipo
    })
    this.id = precio.id;
  }

  editar(){
    this.db.doc('precios/'+this.id).update(this.formularioPrecio.value).then((result)=>{
      this.msj.mensajeCorrecto('Editado', 'Editado correctamente')
      this.formularioPrecio.reset()
      this.esEditable = false;
      this.listadoPrecios()
    }).catch(()=>{
      this.msj.mensajeError('Error', 'Error al editar precio')
    })
  }

}
