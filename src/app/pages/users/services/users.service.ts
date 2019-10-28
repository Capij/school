import { Injectable } from '@angular/core';
import { UsersModel } from '../../../models/users.model';
import { StudenModel } from '../../../models/studen.model';
import { StudentsService } from '../../studens/service/students.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private ss: StudentsService) { }

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

  async save(user:UsersModel, student:StudenModel[]){
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((res)=>{

        user.deleted = false;
        user.pass = false;
        user.uid = res.user.uid;

        this.afs.collection('users').add(user);

        student.forEach((res)=>{
          res.usersID.push(user.uid)
          this.ss.update(res);
        })
        
        return user;
      });   

    } catch (e) {
      console.error(e);
      if (e.message) {
        alert(e.message);
      }
      throw e;
    }

  }

  async update(user:UsersModel, student:StudenModel[], studentsDelete:StudenModel[]){
    if(user.id){

      studentsDelete.forEach((res)=>{
        if(res.usersID.indexOf(user.uid) > -1){
          res.usersID.splice(res.usersID.indexOf(user.uid),1);
          this.ss.update(res);
        }
      });


      student.forEach((res)=>{
        if(res.usersID === undefined){
          res.usersID = [];
        }
        if(res.usersID.indexOf(user.uid) == -1){
          res.usersID.push(user.uid);
          this.ss.update(res);
        }
      }); 

      return this.afs.doc<UsersModel>(`users/${user.id}`).update(user);
    }else{
      throw Error('No cuenta con id')
    }
  }




}
