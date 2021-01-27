import { DocumentReference } from "@angular/fire/firestore";

export class Cliente{
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    fechaNacimiento: Date;
    curp: string;
    imgUrl: string;
    telefono: string;
    ref: DocumentReference;
}