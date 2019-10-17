import { Component, OnInit,Input, Output, EventEmitter ,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef} from '@angular/material';
import { AddStudentComponent } from './dialog/add-student/add-student.component';
import { take } from 'rxjs/internal/operators/take';



@Component({
  selector: 'app-studens',
  templateUrl: './studens.component.html',
  styleUrls: ['./studens.component.css']
})

export class StudensComponent implements OnInit {


  studen = 1;

  dialogRef: MatDialogRef<AddStudentComponent>;

  displayedColumns: string[] = ['nombre', 'apellido','group', 'star'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  constructor(private dialog:MatDialog ) {}

  ngOnInit() {
  }

  
  addStudent(): void{
    this.dialogRef =  this.dialog.open(AddStudentComponent,{
      width: '500px'
    });
    
    this.dialogRef.componentInstance.save.pipe(take(1)).subscribe((projectDocRef) => {
      if(projectDocRef){
        this.dialogRef.close();
      }

    });

  }
}
