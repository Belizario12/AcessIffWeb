import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin!: FormGroup

  constructor(
    private fb: FormBuilder,
  ) {
    this.formLogin = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


}
