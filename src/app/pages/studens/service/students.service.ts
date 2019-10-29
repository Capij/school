import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { StudenModel } from '../../../models/studen.model';
import { map, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { GroupService } from '../../group-admin/service/group.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private afs: AngularFirestore, private gs: GroupService) { }

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
    if(student.groupID != undefined){
      if(student.groupID.id.length != 0){
          student.groupsID.push(student.groupID.id);
          student.groupID.studens = student.groupID.studens + 1; 
          this.gs.update(student.groupID);
      }
    }else{
      student.groupID = { };
    }

    
    return this.afs.collection('students').add(student);

  }

  update(student:StudenModel, group?:any){
    if(group != undefined){

      if(group.id != student.groupID.id){

        this.gs.getGroup(student.groupID.id).subscribe((res)=>{
          res.studens = res.studens + 1; 
          this.gs.update(res);            
        });

        this.gs.getGroup(group.id).subscribe((res)=>{
          if(res.studens > 0){
            res.studens = res.studens - 1; 
            this.gs.update(res);  
          }          
        });
  


      }
    }

    if(student.id){
      return this.afs.doc<StudenModel>(`students/${student.id}`).update(student);
    }else{
      throw Error('No cuenta con id')
    }

  }

  getGroupStudents(groupID:string){
    
    return this.afs.collection('students', res => res.where('groupID.id','==', groupID)).snapshotChanges()
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
