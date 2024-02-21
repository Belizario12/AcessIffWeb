import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieGeneratorService } from '../Cookie/cookie-generator.service';
import { Observable } from 'rxjs';
import { MetadataResponse } from 'src/app/interfaces/metadata';
import { apiUrl } from 'src/app/utils/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  constructor(
    private http: HttpClient,
    private cookie: CookieGeneratorService
  ) { }

  getAcessos(matricula: string, data:string): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`)

    const params = new HttpParams()
      .append("matricula", matricula)
      .append("data", data);

    return this.http.get<MetadataResponse>(apiUrl + "Acesso", { headers: headers, params: params })
  }
}
