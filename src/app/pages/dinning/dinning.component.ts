import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface studens {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dinning',
  templateUrl: './dinning.component.html',
  styleUrls: ['./dinning.component.css']
})


export class DinningComponent implements OnInit {
  studen =1 ;
  studens:studens[] =[
    {id: 1, name: "jose"},
    {id: 2, name: "emmanuel"}
  ];

  fromCarga= new FormGroup({
    saldo: new FormControl('',[Validators.required])
  });

  constructor() { }

  ngOnInit() {
  }

  onCarga()
  {
    if(this.fromCarga.valid){
      alert("cargado");
    }else{
      alert("no cargado");
    }
  }

}
