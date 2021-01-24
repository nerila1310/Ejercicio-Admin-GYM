import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    ListadoClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxSpinnerModule,
    FormsModule

  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})

export class AppModule { }
