import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef} from '@angular/material';

import { GroupsModel } from '../../models/groups.model'
import { AddGroupAdminComponent } from './dialog/add-group-admin/add-group-admin.component'
import { take } from 'rxjs/internal/operators/take';
import { GroupService } from './service/group.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-group-admin',
  templateUrl: './group-admin.component.html',
  styleUrls: ['./group-admin.component.css']
})
export class GroupAdminComponent implements OnInit {
  load= false;

  displayedColumns: string[] = ['group', 'responsable','grade','studensts','star'];
  dataSource = new MatTableDataSource<GroupsModel>();

  dialogRef: MatDialogRef<AddGroupAdminComponent>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  
  constructor(private dialog:MatDialog, private gs:GroupService, private router:Router) {
    this.gs.get().subscribe((res)=>{
      this.load = true;    
      this.dataSource =  new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })

  }

  ngOnInit() {

  }
  
  addGroup(): void{
    this.dialogRef =  this.dialog.open(AddGroupAdminComponent,{
      width: '500px'
    });
    
    this.dialogRef.componentInstance.save.pipe(take(1)).subscribe((projectDocRef) => {
      if(projectDocRef){
        this.dialogRef.close();
      }

    });

  }

  onEdit(group): void{
    this.dialogRef =  this.dialog.open(AddGroupAdminComponent,{
      width: '500px'
    });
    
    this.dialogRef.componentInstance.group = group;
    this.dialogRef.componentInstance.newGroup = false;

    this.dialogRef.componentInstance.save.pipe(take(1)).subscribe((projectDocRef) => {
      if(projectDocRef){
        this.dialogRef.close();
      }

    });
  }

}
