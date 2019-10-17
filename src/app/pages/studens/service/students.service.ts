import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { StudenModel } from '../../../models/studen.model';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private afs: AngularFirestore) { }

  get(): Observable<StudenModel[]>{

    return this.afs.collection('students').snapshotChanges()
    .pipe(
      map((doc)=>{
        return doc.map((ele) =>{
          return {
            id: ele.payload.doc.id,
            ...ele.payload.doc.data()
          }
        }) as StudenModel[];
      })
    )
  }


  save(student:StudenModel){

    return this.afs.collection('students').add(student);

  }

  update(student:StudenModel){
    
    if(student.id){
      return this.afs.doc<StudenModel>(`students/${student.id}`).update(student);
    }else{
      throw Error('No cuenta con id')
    }

  }

  

}
