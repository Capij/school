import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef} from '@angular/material';

import { TeacherModel } from '../../models/teacher.model';
import { AddTeacherComponent } from './dialog/add-teacher/add-teacher.component'
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  displayedColumns: string[] = ['group', 'horario', 'estudiantes','star'];
  dataSource = new MatTableDataSource<TeacherModel>();

  dialogRef: MatDialogRef<AddTeacherComponent>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  addTeacher(): void{
    this.dialogRef =  this.dialog.open(AddTeacherComponent,{
      width: '500px'
    });
    
    this.dialogRef.componentInstance.save.pipe(take(1)).subscribe((projectDocRef) => {
      if(projectDocRef){
        this.dialogRef.close();
      }

    });

  }

}
