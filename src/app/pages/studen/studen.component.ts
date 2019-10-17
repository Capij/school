import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
export interface studens {
  id: number;
  name: string;
}


export interface PeriodicElement {
  materia: string;
  id: number;
  exa1: number;
  exa2: number;
  exa3: number;
  exa4: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, materia: 'Espñol', exa1: 90, exa2: 90,exa3: 90,exa4: 90,},
  {id: 2, materia: 'Matematicas', exa1: 92, exa2: 80,exa3: 93,exa4: 90,},
  {id: 3, materia: 'Fisica', exa1: 89, exa2: 76,exa3: 90,exa4: 90,},
  {id: 4, materia: 'Computo', exa1: 100, exa2: 95,exa3: 90,exa4: 70,},
  {id: 5, materia: 'Deportes', exa1: 99, exa2: 90,exa3: 95,exa4: 90,},
  {id: 6, materia: 'Historia', exa1: 85, exa2: 95,exa3: 90,exa4: 79,},
  {id: 7, materia: 'Artes', exa1: 90, exa2: 86,exa3: 90,exa4: 90,},

];

@Component({
  selector: 'app-studen',
  templateUrl: './studen.component.html',
  styleUrls: ['./studen.component.css']
})
export class StudenComponent implements OnInit {

  studen = 1;

  studens:studens[] =[
    {id: 1, name: "jose"},
    {id: 2, name: "emmanuel"}
  ];

  displayedColumns: string[] = ['materia', 'exam1', 'exam2', 'exam3','exam4'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  ngOnInit() {
  }

}
