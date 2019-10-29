import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import * as CryptoJS from 'crypto-js';
import { UsersModel } from '../../../models/users.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router:Router, private auth:AuthService ){  }
  user:UsersModel;
  ngOnInit() {
    try {
      const bytes = CryptoJS.AES.decrypt(localStorage.getItem("Uv"), "school");
      if (bytes.toString()) {
        this.user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(this.user);
      }

    } catch (e) {
      console.log(e);
    }
  }

  onSignIn(){
    this.auth.logout();
  }
}
