import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { StudenModel } from '../../../models/studen.model';
import { map, switchMap } from 'rxjs/operators'
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
    student.money=0;
    student.groupsID = [];
    student.usersID = [];
    student.timestap =  Date.now();
    if(student.groupID.id.length != 0){
      student.groupsID.push(student.groupID.id);
    }
    
    return this.afs.collection('students').add(student);

  }

  update(student:StudenModel){
    
    if(student.id){
      return this.afs.doc<StudenModel>(`students/${student.id}`).update(student);
    }else{
      throw Error('No cuenta con id')
    }

  }


  getStudents(uid:string){
    return this.afs.collection('students', res => res.where('usersID','array-contains', uid)).snapshotChanges()
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
  

}
