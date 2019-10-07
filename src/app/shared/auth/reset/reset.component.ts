import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  validEmail: any = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"

  createFromGroup(){

    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.validEmail)])
    });

  }

  resetForm:FormGroup;
  constructor(private router:Router) {
    this.resetForm = this.createFromGroup();
  }

  ngOnInit() {
  }

  onReset(){
    if(this.resetForm.valid){
      console.log("reinicar contraseña");
    }else{
      console.log("no se puede ");
    }

  }
  get email() { return this.resetForm.get('email'); }

}
