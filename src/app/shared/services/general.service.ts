import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { UsersModel } from '../../models/users.model';


export interface SubjectModel{
    id  ?: string,
    name : string
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private afs:AngularFirestore ) { }

  subjects(): Observable<SubjectModel[]>{
    return this.afs.collection('subjects').snapshotChanges()
    .pipe(
      map((doc)=>{
        return doc.map((ele) =>{
          return {
            id: ele.payload.doc.id,
            ...ele.payload.doc.data()
          }
        }) as SubjectModel[];
      })
    )
  }


  addUser(user:any,permission :number){
    if(user){
      const data:UsersModel={
        email: user.email,
        deleted: false,
        pass: false,
        uid: user.uid,
        permission: permission
      }
      this.afs.collection('users').add(data);
    }
  }

  getUser(id): Observable<UsersModel[]>{

    return this.afs.collection('users', res => res.where('uid', '==',id)).snapshotChanges()
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
  

}
