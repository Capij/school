import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef} from '@angular/material';
import { take } from 'rxjs/internal/operators/take';

import { AddUserComponent } from './dialog/add-user/add-user.component'
import { UsersModel } from '../../models/users.model';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'email','star'];

  dataSource = new MatTableDataSource<UsersModel>();

  dialogRef: MatDialogRef<AddUserComponent>;

  constructor(private dialog:MatDialog, private us: UsersService) {
    this.us.get().subscribe((res)=>{
      
      this.dataSource =  new MatTableDataSource(res);

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


}
