import { Injectable } from '@angular/core';
import { UsersModel } from '../../../models/users.model';
import { StudenModel } from '../../../models/studen.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  get(): Observable<UsersModel[]>{
    return this.afs.collection('users', res => res.where('deleted','==',false)).snapshotChanges()
    .pipe(
      map((doc)=>{
        return doc.map((ele) =>{
          return {
            id: ele.payload.doc.id,
            ...ele.payload.doc.data()
          }
        }) as UsersModel[];
      })
    )
  }

  async save(user:UsersModel){
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((res)=>{

        user.deleted = false;
        user.pass = false;
        user.uid = res.user.uid;

        return this.afs.collection('users').add(user);

      });   

    } catch (e) {
      console.error(e);
      if (e.message) {
        alert(e.message);
      }
      throw e;
    }

  }

  async update(user:UsersModel){

  }

}
