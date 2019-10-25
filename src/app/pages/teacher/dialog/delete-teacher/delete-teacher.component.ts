import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { TeacherModel } from '../../../../models/teacher.model';

@Component({
  selector: 'app-delete-teacher',
  templateUrl: './delete-teacher.component.html',
  styleUrls: ['./delete-teacher.component.css']
})
export class DeleteTeacherComponent implements OnInit {

  @Input() teacher: TeacherModel;
  @Input() uid:string = "";
  @Output() delete =  new EventEmitter();



  constructor(private ts:TeacherService) {


  }

  ngOnInit() {
  }
  onRemove(){

    this.ts.delete(this.teacher, this.uid).then((res)=>{
      this.delete.emit(res);
    });


  }

}
