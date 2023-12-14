import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private controller: UnitOfControllerService,
    private toastr: ToastrService,
    private route: Router,
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
      next: (result: any) => {
        this.controller.cookieController.setCookie(result.metadata.Data);
        this.toastr.success("Login efetuado com sucesso!", "Sucesso");
        this.route.navigate(['/admin']);

      },
      error: (error) => {
        console.log(error);
        this.toastr.error("Erro ao efetuar login!", "Erro");
      }
    })
}
}
