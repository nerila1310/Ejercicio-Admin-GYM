import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';

  constructor(public ofauth: AngularFireAuth){}

  login() {
    //this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.ofauth.signInWithEmailAndPassword('nerila1310@gmail.com','neri1310')
  }
  logout() {
    this.ofauth.signOut();
  }

}
