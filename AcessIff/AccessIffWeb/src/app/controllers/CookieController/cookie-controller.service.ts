import { Injectable } from '@angular/core';
import { UnitOfWorkService } from 'src/app/services/UnitOfWork/unit-of-work.service';

@Injectable({
  providedIn: 'root'
})
export class CookieControllerService {

  constructor(
    private context: UnitOfWorkService,
  ) { }

  setCookie(token: string) {
    this.context.cookieGeneratorService.setCookie(token);
  }

  getCookie() {
    return this.context.cookieGeneratorService.getCookie();
  }

  deleteCookie() {
    this.context.cookieGeneratorService.deleteCookie();
  }

  checkCookie() {
    return this.context.cookieGeneratorService.checkCookie();
  }
}
