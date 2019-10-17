import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl ,Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { StudenModel } from '../../../../models/studen.model';
import { UsersModel } from '../../../../models/users.model';
import { UsersService } from '../../services/users.service'

export interface User {
  name: string;
  last_name: string;
}


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

  /////////////////////////////////////////////////////////7
  myControl = new FormControl();
  options: User[] = [
    {name: 'Jose Mary', last_name: "1wdw"},
    {name: 'Alme Shelley', last_name: "2wdw"},
    {name: 'Fer Igor', last_name: "2wdw"}
  ];

  filteredOptions: Observable<User[]>;

  ///////////////////////////////////////////////////////////7
  students:StudenModel[]=[];



  constructor(private us: UsersService) {


  }

  ngOnInit() {

///////////////////////////////////////////////////////////////////////////
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );
///////////////////////////////////////////////////////////////////////////////



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










  displayFn(user?: User): string | undefined {
    return user ? user.name +' '+ user.last_name  : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


  studentSelect(value:string){

    console.log(value);

  }

  onStudent(){
    if(this.myControl.value.name){
      var student:StudenModel={
        groupID: "",
        usersID: [],
        name: this.myControl.value.name,
        last_name: this.myControl.value.last_name,
        money: 0,
        groupsID: []
      }

      
      this.students.push(student);
      console.log(this.myControl.value);
    }else{
      console.log(this.myControl.value);
    }

  }


}


