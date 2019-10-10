import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';


export interface SubjectsModel{
    id  ?: string,
    name : string
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private afs:AngularFirestore ) { }

  subjects(): Observable<SubjectsModel[]>{
    return this.afs.collection('subjects').snapshotChanges()
    .pipe(
      map((doc)=>{
        return doc.map((ele) =>{
          return {
            id: ele.payload.doc.id,
            ...ele.payload.doc.data()
          }
        }) as SubjectsModel[];
      })
    )
  }

  

}
