import { Injectable } from '@angular/core';
import { LoginService } from '../Login/login.service';
import { CookieGeneratorService } from '../Cookie/cookie-generator.service';

@Injectable({
  providedIn: 'root'
})
export class UnitOfWorkService {

  constructor(
    public loginService: LoginService,
    public cookieGeneratorService: CookieGeneratorService,
  ) { }
}
