import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { TeacherModel } from '../../../models/teacher.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private router:Router , private afs: AngularFirestore,public afAuth: AngularFireAuth) { }


  get(): Observable<TeacherModel[]>{
    return this.afs.collection('teacher').snapshotChanges()
    .pipe(
      map((doc)=>{
        return doc.map((ele) =>{
          return {
            id: ele.payload.doc.id,
            ...ele.payload.doc.data()
          }
        }) as TeacherModel[];
      })
    )
  }

  async save(teacher: TeacherModel ){
    //console.log(teacher);
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(teacher.email, teacher.password).then((res)=>{
        let dataTeacher ={
          name: teacher.name,
          last_name: teacher.last_name,
          email: teacher.email,
          deleted: false,
          password: false,
          admin: false,
          tid: res.user.uid,
          subjects: teacher.subjects 
        }

        return this.afs.collection('teacher').add(dataTeacher);

      });   

    } catch (e) {
      console.error(e);
      if (e.message) {
        alert(e.message);
      }
      throw e;
    }

    //return this.afs.collection('teacher').add(teacher);
  }

  update(teacher:TeacherModel){
    if(teacher.id){
      return this.afs.doc<TeacherModel>(`teacher/${teacher.id}`).update(teacher);
    }else{
      throw Error('No cuenta con id')
    }

  }

  delete(teacher: TeacherModel){
    return this.afs.doc(`teacher/${teacher.id}`).delete();
  }
}
