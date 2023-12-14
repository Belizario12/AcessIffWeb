import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { apiUrl } from 'src/app/utils/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public Login(data: Login) {
    return this.http.post(apiUrl + 'Usuario/login', data);
  }
}
