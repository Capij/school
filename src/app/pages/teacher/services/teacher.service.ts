import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { GeneralService } from '../../../shared/services/general.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { TeacherModel } from '../../../models/teacher.model';
import { UsersModel } from '../../../models/users.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../../../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  us:TeacherModel;
  constructor(private router:Router ,
              private afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              private auth: AuthService,
              private gs: GeneralService) { }


  get(): Observable<TeacherModel[]>{
    return this.afs.collection('teacher', res => res.where('deleted','==',false)).snapshotChanges()
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
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(teacher.email, teacher.password).then((res)=>{

          teacher.deleted = false;
          teacher.pass = false;
          teacher.admin = false;
          teacher.uid = res.user.uid;

          this.gs.addUser(teacher,2);
          return this.afs.collection('teacher').add(teacher);

      });   

    } catch (e) {
      console.error(e);
      if (e.message) {
        alert(e.message);
      }
      throw e;
    }

  }

  update(teacher:TeacherModel){
    if(teacher.id){
      return this.afs.doc<TeacherModel>(`teacher/${teacher.id}`).update(teacher);
    }else{
      throw Error('No cuenta con id')
    }

  }

  async delete(teacher: TeacherModel, uid:string){

    return this.afs.collection<TeacherModel>('teacher', res => res.where('uid','==', uid)).valueChanges().subscribe((res)=>{
        this.auth.remove(teacher);
        teacher.deleted = true;
        return this.afs.doc<TeacherModel>(`teacher/${teacher.id}`).update(teacher);
     });

  }
}
