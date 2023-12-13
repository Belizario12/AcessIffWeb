import { Injectable } from '@angular/core';
import { LoginControllerService } from '../LoginController/login-controller.service';

@Injectable({
  providedIn: 'root'
})
export class UnitOfControllerService {

  constructor(
    public loginController: LoginControllerService,
  ) { }
}
