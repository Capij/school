import { Component, OnInit } from '@angular/core';

export interface studens {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studen = 1;
  aviso = true;

  studens:studens[] =[
    {id: 1, name: "jose"},
    {id: 2, name: "emmanuel"}
  ];

  constructor() { }

  ngOnInit() {
  }

  onEnterado(){
    this.aviso =false
  }
}
