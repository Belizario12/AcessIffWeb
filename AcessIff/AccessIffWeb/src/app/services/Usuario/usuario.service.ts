import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnitOfWorkService } from '../UnitOfWork/unit-of-work.service';
import { apiUrl } from 'src/app/utils/apiUrl';
import { Usuario } from 'src/app/interfaces/usuario';
import { CookieGeneratorService } from '../Cookie/cookie-generator.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private cookie: CookieGeneratorService,
  ) { }

  public getUsuario(pageNumber: number, pageSize: number) {
    const token = this.cookie.getToken();
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);

    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());

    return this.http.get(apiUrl + "Usuario", { headers: headers });
  }

  public postUsuario(usuario: Usuario) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    return this.http.post(apiUrl + "Usuario", usuario, { headers: headers });
  }

  public putUsuario(usuario: Usuario) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    return this.http.put(apiUrl + "Usuario" + usuario.id, usuario, { headers: headers });
  }

  public deleteUsuario(id: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    return this.http.delete(apiUrl + "Usuario/" + id, { headers: headers });
  }
}
