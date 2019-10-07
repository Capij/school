import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  groupName: string;
  id: number;
  horario: number;
  creado: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, groupName: 'Hyrogen', horario: 1.0079, creado: 'H'},
  {id: 2, groupName: 'Helium', horario: 4.0026, creado: 'He'},
  {id: 3, groupName: 'Lithium', horario: 6.941, creado: 'Li'},
  {id: 4, groupName: 'Beryllium', horario: 9.0122, creado: 'Be'},
  {id: 5, groupName: 'Boron', horario: 10.811, creado: 'B'},
  {id: 6, groupName: 'Carbon', horario: 12.0107, creado: 'C'},
  {id: 7, groupName: 'Nitrogen', horario: 14.0067, creado: 'N'},
  {id: 8, groupName: 'Oxygen', horario: 15.9994, creado: 'O'},
  {id: 9, groupName: 'Fluorine', horario: 18.9984, creado: 'F'},
  {id: 10, groupName: 'Neon', horario: 20.1797, creado: 'Ne'},
  {id: 11, groupName: 'Sodium', horario: 22.9897, creado: 'Na'},
  {id: 12, groupName: 'Magnesium', horario: 24.305, creado: 'Mg'},
  {id: 13, groupName: 'Aluminum', horario: 26.9815, creado: 'Al'},
  {id: 14, groupName: 'Silicon', horario: 28.0855, creado: 'Si'},
  {id: 15, groupName: 'Phosphorus', horario: 30.9738, creado: 'P'},
  {id: 16, groupName: 'Sulfur', horario: 32.065, creado: 'S'},
  {id: 17, groupName: 'Chlorine', horario: 35.453, creado: 'Cl'},
  {id: 18, groupName: 'Argon', horario: 39.948, creado: 'Ar'},
  {id: 19, groupName: 'Potassium', horario: 39.0983, creado: 'K'},
  {id: 20, groupName: 'Calcium', horario: 40.078, creado: 'Ca'},
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
