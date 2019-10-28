import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef} from '@angular/material';

import { TeacherModel } from '../../models/teacher.model';
import { AddTeacherComponent } from './dialog/add-teacher/add-teacher.component'
import { DeleteTeacherComponent } from './dialog/delete-teacher/delete-teacher.component'
import { take } from 'rxjs/internal/operators/take';
import { TeacherService } from './services/teacher.service'
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'email','star'];
  dataSource = new MatTableDataSource<TeacherModel>();

  dialogRef: MatDialogRef<AddTeacherComponent>;
  dialogRefD: MatDialogRef<DeleteTeacherComponent>;
  authU:string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 

  constructor(private dialog:MatDialog , private ts:TeacherService, private auth:AuthService) {
    this.ts.get().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
    });
    this.auth.currentUserObservable.subscribe((res)=>{
      this.authU = res.uid;
    });
  }

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


  onEdit(teacher){
    this.dialogRef =  this.dialog.open(AddTeacherComponent,{
      width: '500px'
    });
    
    this.dialogRef.componentInstance.teacher = teacher
    this.dialogRef.componentInstance.newTeacher = false;

    this.dialogRef.componentInstance.save.pipe(take(1)).subscribe((projectDocRef) => {
      if(projectDocRef){
        this.dialogRef.close();
      }

    });
  }

  onRemove(teacher){
    
    this.dialogRefD =  this.dialog.open(DeleteTeacherComponent,{
      width: '500px'
    });
    
    this.dialogRefD.componentInstance.teacher = teacher;
    this.dialogRefD.componentInstance.uid = this.authU;
    
    this.dialogRefD.componentInstance.delete.pipe(take(1)).subscribe((projectDocRef) => {
      if(projectDocRef){
        this.dialogRefD.close();
      }

    });

  }
}
