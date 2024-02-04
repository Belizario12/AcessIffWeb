import { Login } from './../../interfaces/login';
import { Injectable } from '@angular/core';
import { UnitOfWorkService } from 'src/app/services/UnitOfWork/unit-of-work.service';

@Injectable({
  providedIn: 'root'
})
export class LoginControllerService {

  constructor(
    private context: UnitOfWorkService,
  ) { }

  public Login(data: Login) {
    return this.context.loginService.Login(data)
  }

  public returnLoginEmpty() {
    const loginObj: Login = {
      matricula: '',
      email: '',
      senha: '',
    }

    return loginObj;
  }
}
