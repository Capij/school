import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef} from '@angular/material';
import { take } from 'rxjs/internal/operators/take';

import { GroupService } from '../service/group.service';
import { GroupsModel } from '../../../models/groups.model';
import { AddDayComponent } from '../dialog/add-day/add-day.component';
@Component({
  selector: 'app-view-group-a',
  templateUrl: './view-group-a.component.html',
  styleUrls: ['./view-group-a.component.css']
})
export class ViewGroupAComponent implements OnInit {
  displayedColumns: string[] = ['group', 'responsable','grade','studensts','star'];
  dataSource = new MatTableDataSource<GroupsModel>();

  dialogRef: MatDialogRef<AddDayComponent>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  group:GroupsModel;

  constructor(private router:Router, private arouter: ActivatedRoute, private gs: GroupService,private dialog:MatDialog,) {
    let type = this.arouter.snapshot.paramMap.get('type');
    let id  = this.arouter.snapshot.paramMap.get('id');
    if(type != 'a'){
        this.router.navigate(['group_admin'])
    }

    this.gs.getGroup(id).subscribe((res)=>{
      this.group = res;
      console.log(res);
    });

  }

  ngOnInit() {
  }
  
  addDay(): void{
    this.dialogRef =  this.dialog.open(AddDayComponent,{
      width: '800px'
    });
    
    this.dialogRef.componentInstance.save.pipe(take(1)).subscribe((projectDocRef) => {
      if(projectDocRef){
        this.dialogRef.close();
      }

    });

  }

}
