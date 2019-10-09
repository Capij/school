import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl ,Validators } from '@angular/forms';
import { GroupsModel } from '../../../../models/groups.model';
import { GroupService } from '../../service/group.service';
import { Observable } from 'rxjs';

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


  members : Observable<GroupsModel[]>;



  fromNewProyects =  new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    typeTime: new FormControl('', [Validators.required]),
    projectTime: new FormControl('',[Validators.required]),
    desc: new FormControl(''),
    members: new FormControl([''])
  });


  uid :string;

  constructor( private gs: GroupService) {
    

  }

  ngOnInit() {
    if(this.project){
      this.fromNewProyects.patchValue(this.project);
    }
  }

  onSave(){  
    this.stop = true;
    if(this.fromNewProyects.valid){
      if(!this.newProject && this.project){
        const projectUpdated ={
          id: this.project.id,
          ...this.fromNewProyects.value
        };
        this.gs.update(projectUpdated)
        .then(() => this.save.emit(projectUpdated))
        .catch((err) => console.log(err));

      }else{
        //console.log(this.fromNewProyects.value.typeTime)
        this.fromNewProyects.value.timestamp = Date.now();
        this.fromNewProyects.value.uid = this.uid;

        this.gs.save(this.fromNewProyects.value)
        .then((res)=>{this.save.emit(res)})
        .catch((err)=> console.log(err));
      
      }

    }else{
      console.log("no entro");
    }

  }
}
