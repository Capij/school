import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validEmail: any = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"

  createFromGroup() {

    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.validEmail)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

  }

  loginForm: FormGroup;

  constructor(private router: Router, private auth: AuthService) {

    this.loginForm = this.createFromGroup();

  }

  ngOnInit() {
  }

  async onLogin() {
    try {
      if (this.loginForm.valid) {
        await this.auth.login(this.loginForm.value.email, this.loginForm.value.password);
      } else {
        console.log('Invalid Form');
      }
    } catch (e) {
      throw e;
    }
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }
}
