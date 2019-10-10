import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { GroupsModel } from '../../../models/groups.model';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private router:Router , private afs: AngularFirestore) { }


  get(uid:string): Observable<GroupsModel[]>{
    return this.afs.collection('groups').snapshotChanges()
    .pipe(
      map((doc)=>{
        return doc.map((ele) =>{
          return {
            id: ele.payload.doc.id,
            ...ele.payload.doc.data()
          }
        }) as GroupsModel[];
      })
    )
  }

  save(group: GroupsModel ){
    return this.afs.collection('groups').add(group);
  }

  update(group:GroupsModel){
    if(group.id){
      return this.afs.doc<GroupsModel>(`groups/${group.id}`).update(group);
    }else{
      throw Error('No cuenta con id')
    }

  }

  delete(group: GroupsModel){
    return this.afs.doc(`groups/${group.id}`).delete();
  }

}
