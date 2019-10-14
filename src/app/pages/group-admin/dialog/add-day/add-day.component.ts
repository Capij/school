import { Component, OnInit,Input,Output,EventEmitter,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl ,Validators } from '@angular/forms';

import { GroupsModel , SubjectsModel, DaysModel} from '../../../../models/groups.model';
import { GroupService } from '../../service/group.service';
import { TeacherModel } from '../../../../models/teacher.model';
import { TeacherService } from '../../../teacher/services/teacher.service';
import { GeneralService,SubjectModel } from '../../../../shared/services/general.service';

@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.component.html',
  styleUrls: ['./add-day.component.css']
})

export class AddDayComponent implements OnInit {


  @Input() group: GroupsModel; 
  @Input() newGroup =  true;
  @Output() save =  new EventEmitter();


  stop = false;

  //lee las materias que estan dadas de alta
  sunjects: SubjectModel[];

  //Es un objeto que guarda las clases que se estan tomando
  daySubjects: SubjectsModel[]=[]; 

  //aqui se guardan los maestros que imparten la materia
  teacherSearch: TeacherModel[];

  teacherData: TeacherModel[]; //lista de los maestros que estan dados de alta
  
  weekSave:DaysModel;

  hours = [
    {id:1, hour:"7am"},
    {id:2, hour:"7:30am"},
    {id:3, hour:"8am"},
    {id:4, hour:"8:30am"},
    {id:5, hour:"9am"},
    {id:6, hour:"9:30am"},
    {id:7, hour:"10am"},
    {id:8, hour:"10:30am"},
    {id:9, hour:"11am"},
    {id:10, hour:"11:30am"},
    {id:11, hour:"12pm"},
    {id:12, hour:"12:30am"},
    {id:13, hour:"13pm"},
    {id:14, hour:"13:30am"},
    {id:15, hour:"14pm"},
    {id:16, hour:"14:30am"},
    {id:17, hour:"15pm"},
    {id:18, hour:"15:30am"},
    {id:19, hour:"16pm"},
    {id:20, hour:"16:30am"},
    {id:21, hour:"17pm"},
    {id:22, hour:"17:30am"},
    {id:23, hour:"18pm"},
    {id:24, hour:"18:30am"},
    {id:25, hour:"19pm"},
    {id:26, hour:"19:30am"},
    {id:27, hour:"20pm"},
    {id:28, hour:"20:30am"},
    {id:29, hour:"21pm"},
    {id:30, hour:"21:30am"},
    {id:31, hour:"22pm"}
  ]
  
  hoursS =[];

  week =[
    {id:1, day:"Lunes"},
    {id:2, day:"Martes"},
    {id:3, day:"Miercoles"},
    {id:4, day:"Jueves"},
    {id:5, day:"Viernes"},
    {id:6, day:"Sabado"}
  ]

  error:string = "";

  fromNew =  new FormGroup({
    teacherName: new FormControl('',  [ Validators.required ]),
    subject: new FormControl('', [ Validators.required ]),
    hourInit: new FormControl('', [Validators.required]),
    hourEnd: new FormControl('', [Validators.required]),
    teacher: new FormControl('',[Validators.required]), 
  
    monday: new FormControl(false),
    tuesday: new FormControl(false),
    wednesday : new FormControl(false),
    thursday : new FormControl(false),
    friday : new FormControl(false),
    saturday : new FormControl(false)

  });

  constructor(private generalS:GeneralService, private ts: TeacherService, private gs: GroupService) {

    this.generalS.subjects().subscribe((res)=>{
      this.sunjects = res;
    });

    this.ts.get().subscribe((res)=>{
      this.teacherData =  res;
    })


  }

  ngOnInit() {
  }


  searchTeacher(search:string){
    this.teacherSearch=[];
    this.teacherData.forEach((res)=>{
      if(res.subjects.indexOf(search) != -1){
        this.teacherSearch.push(res);
      }
    })

  }

  init(value:number){
    this.hoursS = [];
    this.hours.forEach((res)=>{
      if(res.id > value){
        this.hoursS.push(res);
      }
    })
  }

  onAddClass(){
    var ob:SubjectsModel;
    this.error = '';
    var SubName:string;
    var TeachName:string;
    var flagE:boolean = false;
    var flagC:boolean = false;

    this.daySubjects.forEach((res)=>{
      if(res.hourInit == this.fromNew.value.hourInit || this.fromNew.value.hourInit < res.hourEnd){
        flagE = true;
      }
      if(res.subjectID == this.fromNew.value.subject){
        flagC = true;
      }
    });

    if(!flagE && !flagC){ 
            this.teacherSearch.forEach((res)=>{
              if(res.id == this.fromNew.value.teacher){
                TeachName = res.name +" "+res.last_name;
              }

            });

            this.sunjects.forEach((res)=>{
              if(res.id == this.fromNew.value.subject){
                SubName = res.name;
              }
            });

            ob={
                teacherID : this.fromNew.value.teacher,
                teacherName: TeachName,
                subjectID : this.fromNew.value.subject,
                subjectName: SubName,
                hourInit : this.fromNew.value.hourInit,
                hourEnd : this.fromNew.value.hourEnd,
                break: false
              };

              this.daySubjects.push(ob);
    }else{
      this.error= 'El horario se empalma';
    }


  }

  onSave(){

    if(this.fromNew.value.monday){
      this.group.week.monday = [];
    }

    if(this.fromNew.value.tuesday){
        this.group.week.tuesday = [];
    }

    if(this.fromNew.value.wednesday){
        this.group.week.wednesday = [];
    }

    if(this.fromNew.value.thursday){
        this.group.week.tuesday = [];
    }

    if(this.fromNew.value.friday){
        this.group.week.friday = [];
    }

    if(this.fromNew.value.saturday){
        this.group.week.saturday = [];
    }

    this.daySubjects.forEach((res)=>{

      if(this.fromNew.value.monday){
          this.group.week.monday.push(res);
      }

      if(this.fromNew.value.tuesday){
          this.group.week.tuesday.push(res);
      }

      if(this.fromNew.value.wednesday){
          this.group.week.wednesday.push(res);
      }

      if(this.fromNew.value.thursday){
          this.group.week.thursday.push(res);
      }

      if(this.fromNew.value.friday){
          this.group.week.friday.push(res);
      }

      if(this.fromNew.value.saturday){
          this.group.week.saturday.push(res);
      }

    })

    this.gs.update(this.group).then((res)=>{
       this.save.emit(this.group);
    });
  
  }


}
