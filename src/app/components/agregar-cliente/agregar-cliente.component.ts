import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  
  formularioCliente!: FormGroup;
  porcentaje: number | undefined = 0; 
  urlImagen: string = '';
  id!: string;
  esEditable: Boolean = false;
  
  constructor( 
    private fb: FormBuilder, 
    private storage: AngularFireStorage, 
    private afs: AngularFirestore,
    private activeRoute: ActivatedRoute,){ }

  ngOnInit(): void {
    
    this.formularioCliente  = this.fb.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      correo:['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      curp:[''],
      fechaNacimiento:['', Validators.required],
      telefono:[''],
      imgUrl: ['', Validators.required]
    })
  
    this.id = this.activeRoute.snapshot.params.clienteID;
    if(this.id != undefined){
      this.esEditable = true;
      this.afs.doc<any>('clientes/'+this.id).valueChanges().subscribe((cliente)=>{
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          curp: cliente.curp,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds*1000).toISOString().substr(0,10),
          telefono: cliente.telefono,
          imgUrl: ''
        })
        this.urlImagen = cliente.imgUrl;
      })
    }
  }

  agregar(){

    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    this.afs.collection('clientes').add(this.formularioCliente.value).then((termino)=>{})
  }

  editar(){

    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    this.afs.doc('clientes/'+this.id).update(this.formularioCliente.value)
  }

  subirImagen(event: any){

    if(event.target.files.length >0 ){
      let nombre = new Date().getTime().toString();
      let archivo = event.target.files[0];
      let extencion = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
      let  ruta = 'clientes/'+nombre+extencion;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then((objRecibido) => {
        console.log('imagen subida')
        referencia.getDownloadURL().subscribe((url)=>{
          this.urlImagen = url;
        })
      })
      tarea.percentageChanges().subscribe((porcentajeS)=>{
        this.porcentaje = parseInt( porcentajeS.toString() );
      })
    }
  }
}
