import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin!: FormGroup;

  constructor(private fb: FormBuilder,public ofauth: AngularFireAuth) { }
  
  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      email:['', Validators.compose([Validators.required, Validators.email])],
      password:['', Validators.required]
    });
  }

  ingresar() {
    this.ofauth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password)
    .then((usuario)=>{
      console.log(usuario);
    })
  }

}

