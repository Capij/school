import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router, public afAuth: AngularFireAuth, private afs:AngularFirestore ) { }

  async register(user: any) {
    console.log(`Registering '${user.nombre}' with email '${user.email}'...`);
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((res)=>{
        let dataUser ={
          email: user.email,
          name: user.nombre,
          uid: res.user.uid 
        }

        this.afs.collection('users').add(dataUser);
        this.router.navigate(['/login']);
      });   

    } catch (e) {
      console.error(e);
      if (e.message) {
        alert(e.message);
      }
      throw e;
    }
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
    } catch (e) {
      console.error(e);
      if (e.message) {
        alert(e.message);
      }
      throw e;
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  get authenticated(): boolean {
    return firebase.auth().currentUser !== null;
  }

  get isAuthenticated(): Observable<boolean> {
    // La funcion map() dentro de pipe() sirve para transformar lo que
    // el observable ('user' en este caso) arroja. Aquí lo 'mapeamos'
    // del tipo User a booleano ya que el resultado de 'user !== null'
    // es un booleano true o false.
    return this.afAuth.user.pipe(
      map((user) => user !== null)
    );
  }

  get currentUserObservable(): Observable<firebase.User> {
    return this.afAuth.user;
  }
}
