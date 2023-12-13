import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { Login } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin!: FormGroup;
  loginObj: Login = this.controller.loginController.returnLoginEmpty();

  constructor(
    private fb: FormBuilder,
    private controller: UnitOfControllerService,
  ) {
    this.formLogin = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.loginObj.email = this.formLogin.get('user')?.value;
    this.loginObj.senha = this.formLogin.get('password')?.value;

    this.controller.loginController.Login(this.loginObj).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      }
    })
}
}
