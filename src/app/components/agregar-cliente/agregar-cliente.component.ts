import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  
  formularioCliente!: FormGroup;
  porcentaje: number | undefined = 0; 
  
  constructor( private fb: FormBuilder, private storage: AngularFireStorage) { }

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
  }

  agregar(){
    console.log(this.formularioCliente.value);
  }

  subirImagen(event: any){

    let nombre = new Date().getTime().toString();
    let archivo = event.target.files[0];
    let extencion = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
    let  ruta = 'clientes/'+nombre+extencion;
    const referencia = this.storage.ref(ruta);
    const tarea = referencia.put(archivo);
    tarea.then((objRecibido) => {
      console.log('imagen subida')
      referencia.getDownloadURL().subscribe((url)=>{
        console.log(url)
      })
    })
    tarea.percentageChanges().subscribe((porcentajeS)=>{
      this.porcentaje = parseInt( porcentajeS.toString() );
    })
    
  }

}
