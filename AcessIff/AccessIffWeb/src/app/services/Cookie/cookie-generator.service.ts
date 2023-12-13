import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieGeneratorService {

  constructor(
    private cookie: CookieService,
  ) { }

  public setCookie(token: string) {
    this.cookie.set('token', token, 10, '/');
  }

  public getCookie() {
    const cookieValue = this.cookie.get('token');

    return jwtDecode(cookieValue);
  }

  public deleteCookie() {
    this.cookie.delete('token', '/');
  }

  public checkCookie() {
    return this.cookie.check('token');
  }
}
