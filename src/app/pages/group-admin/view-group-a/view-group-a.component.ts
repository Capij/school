import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef} from '@angular/material';
import { take } from 'rxjs/internal/operators/take';

import { GroupService } from '../service/group.service';
import { GroupsModel } from '../../../models/groups.model';
import { StudenModel } from '../../../models/studen.model';
import { StudentsService } from '../../studens/service/students.service';
import { AddDayComponent } from '../dialog/add-day/add-day.component';

@Component({
  selector: 'app-view-group-a',
  templateUrl: './view-group-a.component.html',
  styleUrls: ['./view-group-a.component.css']
})
export class ViewGroupAComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'star'];
  dataSource = new MatTableDataSource<StudenModel>();
  

  dialogRef: MatDialogRef<AddDayComponent>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  group:GroupsModel;
 
  status = 0;
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
  ];


  constructor(private router:Router,
              private arouter: ActivatedRoute, 
              private gs: GroupService,
              private dialog:MatDialog,
              private ss : StudentsService) {

    let type = this.arouter.snapshot.paramMap.get('type');
    let id  = this.arouter.snapshot.paramMap.get('id');
    if(type != 'a'){
        this.router.navigate(['group_admin'])
    }

    this.gs.getGroup(id).subscribe((res)=>{
      this.group = res;
      this.group.id = id;
      if(this.group.week === undefined){
        this.group.week = {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: []
        }
      }
    });

    this.ss.getGroupStudents(id).subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);      
    });

  }

  ngOnInit() {
  }
  
  add(): void{
    if(this.status == 0){
        this.dialogRef =  this.dialog.open(AddDayComponent,{
          width: '800px'
        });
        
        this.dialogRef.componentInstance.group =  this.group;
        this.dialogRef.componentInstance.save.pipe(take(1)).subscribe((projectDocRef) => {
          if(projectDocRef){
            this.dialogRef.close();
          }

        });
    }else if(this.status == 1){
      console.log("dasdsad");

    }
  }

  mode(type: any){
    this.status = type.index;
    console.log(type.index);
    this.dataSource.paginator = this.paginator;
  }

}
