import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl ,Validators } from '@angular/forms';

import { UsersModel } from '../../../../models/users.model';
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() user: UsersModel; 
  @Input() newUser =  true;
  @Output() save =  new EventEmitter();
  stop = false;

  fromNew =  new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });


  constructor(private us: UsersService) { }

  ngOnInit() {
  }

  onSave(){
    this.stop = true;
    if(this.fromNew.valid){
      if(!this.newUser && this.user){
        const updated ={
          id: this.user.id,
          ...this.fromNew.value
        };
        this.us.update(updated)
        .then(() => this.save.emit(updated))
        .catch((err) => console.log(err));

      }else{
        //console.log(this.fromNewProyects.value.typeTime)
        this.fromNew.value.timestamp = Date.now();

        this.us.save(this.fromNew.value)
        .then((res)=>{this.save.emit(res)})
        .catch((err)=> console.log(err));
      
      }

    }else{
      console.log("no entro");
    }
  }

  get name() { return this.fromNew.get('name'); }
  get last_name() { return this.fromNew.get('last_name'); }
  get email() { return this.fromNew.get('email'); }
  get password() { return this.fromNew.get('password'); }

}


