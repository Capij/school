import { Injectable } from '@angular/core';
import { FatherModel } from '../../../models/father.model';
import { StudenModel } from '../../../models/studen.model';
import { StudentsService } from '../../studens/service/students.service';
import { GeneralService } from '../../../shared/services/general.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private ss: StudentsService,
    private gs:GeneralService) { }

  get(): Observable<FatherModel[]>{
    return this.afs.collection('fathers', res => res.where('deleted','==',false)).snapshotChanges()
    .pipe(
      map((doc)=>{
        return doc.map((ele) =>{
          return {
            id: ele.payload.doc.id,
            ...ele.payload.doc.data()
          }
        }) as FatherModel[];
      })
    )
  }

  async save(father:FatherModel, student:StudenModel[]){
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(father.email, father.password).then((res)=>{

        father.deleted = false;
        father.uid = res.user.uid;

        this.afs.collection('fathers').add(father);

        student.forEach((res)=>{
          res.usersID.push(father.uid)
          this.ss.update(res);
        })
        this.gs.addUser(father,3);
        
        return father;
      });   

    } catch (e) {
      console.error(e);
      if (e.message) {
        alert(e.message);
      }
      throw e;
    }

  }

  async update(father:FatherModel, student:StudenModel[], studentsDelete:StudenModel[]){
    if(father.id){

      studentsDelete.forEach((res)=>{
        if(res.usersID.indexOf(father.uid) > -1){
          res.usersID.splice(res.usersID.indexOf(father.uid),1);
          this.ss.update(res);
        }
      });


      student.forEach((res)=>{
        if(res.usersID === undefined){
          res.usersID = [];
        }
        if(res.usersID.indexOf(father.uid) == -1){
          res.usersID.push(father.uid);
          this.ss.update(res);
        }
      }); 

      return this.afs.doc<FatherModel>(`fathers/${father.id}`).update(father);
    }else{
      throw Error('No cuenta con id')
    }
  }




}
