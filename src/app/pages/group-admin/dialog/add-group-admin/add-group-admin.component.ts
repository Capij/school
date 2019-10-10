import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl ,Validators } from '@angular/forms';
import { GroupsModel } from '../../../../models/groups.model';
import { GroupService } from '../../service/group.service';
import { Observable } from 'rxjs';
import { TeacherService } from '../../../teacher/services/teacher.service';
import { TeacherModel } from '../../../../models/teacher.model';
import { GeneralService } from '../../../../shared/services/general.service';

@Component({
  selector: 'app-add-group-admin',
  templateUrl: './add-group-admin.component.html',
  styleUrls: ['./add-group-admin.component.css']
})

export class AddGroupAdminComponent implements OnInit {

  @Input() project: GroupsModel; 
  @Input() newProject =  true;
  @Output() save =  new EventEmitter();
  
  stop = false;

  fromNew =  new FormGroup({
    name: new FormControl('',  [ Validators.required ]),
    grade: new FormControl('', [ Validators.required ]),
    hour: new FormControl('',  [ Validators.required ]),

  });


  uid :string;
  
  teacherSearch: TeacherModel[];
  teacherData: TeacherModel[];
  
  subjects: any[];

  constructor( private gs: GroupService, private ts:TeacherService, private general:GeneralService) {
    
    this.ts.get().subscribe((res)=>{
      this.teacherSearch = res;
    })

    this.general.subjects().subscribe((res)=>{
      this.subjects = res;
    })

  }

  ngOnInit() {
    if(this.project){
      this.fromNew.patchValue(this.project);
    }
  }

  onSave(){  
    this.stop = true;
    if(this.fromNew.valid){
      if(!this.newProject && this.project){
        const projectUpdated ={
          id: this.project.id,
          ...this.fromNew.value
        };
        this.gs.update(projectUpdated)
        .then(() => this.save.emit(projectUpdated))
        .catch((err) => console.log(err));

      }else{
        //console.log(this.fromNewProyects.value.typeTime)
        this.fromNew.value.timestamp = Date.now();
        this.fromNew.value.uid = this.uid;

        this.gs.save(this.fromNew.value)
        .then((res)=>{this.save.emit(res)})
        .catch((err)=> console.log(err));
      
      }

    }else{
      console.log("no entro");
    }

  }

  someMethod(search:string){
    
    this.teacherData = [];
    this.teacherSearch.forEach((res)=>{
      if(res.subjects.indexOf(search) != -1){
        this.teacherData.push(res);
      }
    })


  }

}
