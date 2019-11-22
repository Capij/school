import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef} from '@angular/material';
import { take } from 'rxjs/internal/operators/take';

import { AddUserComponent } from './dialog/add-user/add-user.component'
import { FatherModel } from '../../models/father.model';
import { UsersService } from './services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'email','star'];
  dataSource = new MatTableDataSource<FatherModel>();
  dialogRef: MatDialogRef<AddUserComponent>;

  load = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private dialog:MatDialog, private us: UsersService) {
    this.us.get().subscribe((res)=>{

      this.dataSource =  new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.load = true;
    })
  }

  ngOnInit() {
  }


  addUser(){
    this.dialogRef =  this.dialog.open(AddUserComponent,{
      width: '500px'
    });
    
    this.dialogRef.componentInstance.save.pipe(take(1)).subscribe((projectDocRef) => {
      if(projectDocRef){
        this.dialogRef.close();
      }

    });
  }


  onEdit(user: FatherModel){
    this.dialogRef =  this.dialog.open(AddUserComponent,{
      width: '500px'
    });
    
    this.dialogRef.componentInstance.user = user;
    this.dialogRef.componentInstance.newUser = false;

    
    this.dialogRef.componentInstance.save.pipe(take(1)).subscribe((projectDocRef) => {
      if(projectDocRef){
        this.dialogRef.close();
      }

    });
  }

}
