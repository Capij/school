import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validEmail: any = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
  createFromGroup() {

    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.validEmail)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

  }

  registroForm: FormGroup;
  constructor(private router: Router, private auth: AuthService) {

    this.registroForm = this.createFromGroup();

  }

  ngOnInit() {
  }

  async onRegistro() {
    try {
      if (!this.registroForm.valid) return;
      await this.auth.register(this.registroForm.value);
    } catch (e) {
      throw e;
    }
  }

  get nombre() { return this.registroForm.get('nombre'); }

  get email() { return this.registroForm.get('email'); }

  get password() { return this.registroForm.get('password'); }

}
