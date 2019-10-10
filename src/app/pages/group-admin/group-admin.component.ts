import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef} from '@angular/material';

import { GroupsModel } from '../../models/groups.model'
import { AddGroupAdminComponent } from './dialog/add-group-admin/add-group-admin.component'
import { take } from 'rxjs/internal/operators/take';




@Component({
  selector: 'app-group-admin',
  templateUrl: './group-admin.component.html',
  styleUrls: ['./group-admin.component.css']
})
export class GroupAdminComponent implements OnInit {
  displayedColumns: string[] = ['group', 'horario', 'estudiantes','star'];
  dataSource = new MatTableDataSource<GroupsModel>();

  dialogRef: MatDialogRef<AddGroupAdminComponent>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  addGroup(): void{
    this.dialogRef =  this.dialog.open(AddGroupAdminComponent,{
      width: '800px'
    });
    
    this.dialogRef.componentInstance.save.pipe(take(1)).subscribe((projectDocRef) => {
      if(projectDocRef){
        this.dialogRef.close();
      }

    });

  }

}
