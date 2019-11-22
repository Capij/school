import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import * as CryptoJS from 'crypto-js';
import { UsersModel } from '../../../models/users.model';

const menu3:any = [
  { url: "/dashboard", name: "Dashboard"},
  { url: "/studen", name: "Estudiante" },
  { url: "/dinning_room", name: "Comedor"},
  { url: "/calendar", name: "Calendario"}
];

const menu2:any = [
  { url: "/dashboard", name: "Dashboard"},
  { url: "/groups", name: "Grupos" },
  { url: "/calendar", name: "Calendario"}
];

const menu1:any=[
  { url: "/dashboard", name: "Dashboard"},
  { url: "/users", name: "Padres"},
  { url: "/studens", name: "Estudiantes"},
  { url: "/teachers", name: "Usuarios"},
  { url: "/group_admin", name: "Grupos"},
];

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  user:UsersModel;
  menus:any;
  constructor(private router:Router, private auth:AuthService ){

    try {
      const bytes = CryptoJS.AES.decrypt(localStorage.getItem("Uv"), "school");
  
      if (bytes.toString()) {
        this.user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];
    
        if(this.user.permission == 3){
          this.menus = menu3;
        }
        if(this.user.permission == 2){
          this.menus = menu2;
        }
        if(this.user.permission == 1){
          this.menus = menu1;
        }


        // this.user={
        //   deleted: false,
        //   email: "",
        //   pass: true,
        //   permission: this.user.permission,
        //   uid: ""
        // };
      }

    } catch (e) {
      console.log(e);
    }

  }

  ngOnInit() {}

  onEdit(){


  }
  onSignIn(){
    this.auth.logout();
  }
}
