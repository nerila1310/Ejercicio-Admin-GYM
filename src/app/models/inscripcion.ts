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
        
    }
}