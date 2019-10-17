import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { StudenModel } from '../../../../models/studen.model';
import { GroupsModel } from '../../../../models/groups.model';
import { GroupService } from '../../../group-admin/service/group.service';

import { StudentsService } from '../../service/students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  @Input() student: StudenModel; 
  @Input() newStudent =  true;
  @Output() save =  new EventEmitter();
  stop = false;


  formNew = new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    groupID: new FormControl(''),
  })

  groups:GroupsModel[];

  constructor(private gs:GroupService, private ss: StudentsService) {

    this.gs.get().subscribe((res)=>{
      this.groups =  res;
    })

  }

  ngOnInit() {
  }

  onSave(){
    this.stop = true;
    if(this.formNew.valid){
      if(!this.newStudent && this.student){
        const updated ={
          id: this.student.id,
          ...this.formNew.value
        };
        this.ss.update(updated)
        .then(() => this.save.emit(updated))
        .catch((err) => console.log(err));

      }else{
  
        this.ss.save(this.formNew.value)
        .then((res)=>{this.save.emit(res)})
        .catch((err)=> console.log(err));
      
      }

    }else{
      console.log("no entro");
    }
  }

  get name() { return this.formNew.get('name'); }
  get last_name() { return this.formNew.get('last_name'); }
  get groupID() { return this.formNew.get('groupID'); }

}
