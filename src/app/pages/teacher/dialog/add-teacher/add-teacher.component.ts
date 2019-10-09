import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl ,Validators } from '@angular/forms';
import { TeacherModel } from '../../../../models/teacher.model';
import { TeacherService } from '../../services/teacher.service';
import { Observable } from 'rxjs';

export interface sub{
  value : number,
  name: string 
}


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})

export class AddTeacherComponent implements OnInit {
  @Input() teacher: TeacherModel; 
  @Input() newTeacher =  true;
  @Output() save =  new EventEmitter();
  stop = false;
  hide = true;

  subjectsD: sub[] = [
    {value:1, name:"Español"},
    {value:2, name:"Matematicas"},
    {value:3, name:"Geografia"},
    {value:4, name:"Historial"}
  ]
  members : Observable<TeacherModel[]>;



  fromNew =  new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    subjects: new FormControl('',Validators.required)
  });


  uid :string;

  constructor( private ts: TeacherService) {
    

  }

  ngOnInit() {
    if(this.teacher){
      this.fromNew.patchValue(this.teacher);
    }
  }

  onSave(){  
    this.stop = true;
    if(this.fromNew.valid){
      if(!this.newTeacher && this.teacher){
        const updated ={
          id: this.teacher.id,
          ...this.fromNew.value
        };
        this.ts.update(updated)
        .then(() => this.save.emit(updated))
        .catch((err) => console.log(err));

      }else{
        //console.log(this.fromNewProyects.value.typeTime)
        this.fromNew.value.timestamp = Date.now();

        this.ts.save(this.fromNew.value)
        .then((res)=>{this.save.emit(res)})
        .catch((err)=> console.log(err));
      
      }

    }else{
      console.log("no entro");
    }

  }

  get name() { return this.fromNew.get('name'); }
  get last_name() { return this.fromNew.get('last_name'); }
  get email() { return this.fromNew.get('email'); }
  get password() { return this.fromNew.get('password'); }
  get passwordConfirm() { return this.fromNew.get('passwordConfirm'); }
  get subjects() { return this.fromNew.get('subjects'); }

}
