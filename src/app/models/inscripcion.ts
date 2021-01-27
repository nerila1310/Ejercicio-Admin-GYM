import { DocumentReference } from "@angular/fire/firestore";

export class Inscripcion{
    fecha: Date;
    fechaFinal: Date;
    cliente: DocumentReference;
    precios: DocumentReference; 
    subtotal: number;
    impuesto: number;
    total: number;

    constructor(){
        this.fecha = this.fecha;
        this.fechaFinal = this.fechaFinal;
        this.cliente = this.cliente;
        this.precios = this.precios;
        this.subtotal = this.subtotal;
        this.impuesto = this.impuesto;
        this.total = this.total;
    }
}