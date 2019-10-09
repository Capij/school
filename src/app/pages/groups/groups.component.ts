import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  groupName: string;
  id: number;
  horario: string;
  creado: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, groupName: '1-A', horario: '9-10', creado: 24},
  {id: 2, groupName: '1-B', horario: '10-11', creado: 34},
  {id: 3, groupName: '2-A', horario: '11-12', creado: 34},
  {id: 4, groupName: '2-A', horario: '12-13', creado: 45},
  {id: 5, groupName: '3-A', horario: '13-14', creado: 12},
  {id: 6, groupName: '4-A', horario: '14-15', creado: 23},
  {id: 7, groupName: '5-A', horario: '15-16', creado: 23},
  {id: 8, groupName: '5-A', horario: '16-17', creado: 24},
  {id: 9, groupName: '6-A', horario: '18-19', creado: 12}
];

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})

export class GroupsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'groupName', 'weight', 'symbol','star'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
