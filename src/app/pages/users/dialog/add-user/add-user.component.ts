import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl ,Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { StudenModel } from '../../../../models/studen.model';
import { UsersModel } from '../../../../models/users.model';
import { UsersService } from '../../services/users.service'
import { StudentsService } from '../../../studens/service/students.service';
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
  hide = true;


  fromNew =  new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  /////////////////////////////////////////////////////////7
  myControl = new FormControl();
  options: StudenModel[];

  filteredOptions: Observable<User[]>;

  ///////////////////////////////////////////////////////////7
  students:StudenModel[]=[];
  studentsaOrigin:string[]=[];

  constructor(private us: UsersService,  private ss: StudentsService) {
    this.ss.get().subscribe((res)=>{
      this.options = res;
      
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );

    })

  }

  ngOnInit() {
    if(this.user){
      this.fromNew.patchValue(this.user);
      this.ss.getStudents(this.user.uid).subscribe((res)=>{
        this.students = res;
        res.forEach((res)=>{
          this.studentsaOrigin.push(res.id);
        });

      });
    }

   }

  onSave(){
    this.stop = true;
    if(this.fromNew.valid){
      if(!this.newUser && this.user){
        const updated ={
          id: this.user.id,
          ...this.fromNew.value
        };
        this.us.update(updated, this.students,this.studentsaOrigin)
        .then(() => this.save.emit(updated))
        .catch((err) => console.log(err));

      }else{
        //console.log(this.fromNewProyects.value.typeTime)
        this.fromNew.value.timestamp = Date.now();

        this.us.save(this.fromNew.value, this.students)
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
      let flag = true;
      this.students.forEach((res)=>{
        if( res.id == this.myControl.value.id){
          flag = false;
        }
      });

      if(flag){
        this.students.push(this.myControl.value);
      }

    }
    this.myControl.patchValue("");
  }


  onStudenDelete(studentID){
    console.log(this.students);
    let i = 0;
    this.students.forEach((res)=>{
      if(res.id == studentID){
         this.students.splice(i,1);

      }
      i++;
    });
    console.log(this.students);
    console.log(studentID);

  }
}


