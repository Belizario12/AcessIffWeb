import { CookieGeneratorService } from './../Cookie/cookie-generator.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAlerta } from 'src/app/interfaces/alerta';
import { MetadataRequest, MetadataResponse } from 'src/app/interfaces/metadata';
import { apiUrl } from 'src/app/utils/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    private http: HttpClient,
    private cookie: CookieGeneratorService,
  ) { }

  getAlertas(pageNumber: Number, pageSize: Number): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    const params = new HttpParams()
      .append('pageNumber', pageNumber.toString())
      .append('pageSize', pageSize.toString());

    return this.http.get<MetadataResponse>(apiUrl + `Alertas`, { headers, params });
  }

  getAlertaById(id: string): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.get<MetadataResponse>(apiUrl + `Alertas/${id}`, { headers });
  }

  postAlerta(alerta: CreateAlerta): Observable<MetadataRequest> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.post<MetadataRequest>(apiUrl + "Alertas", alerta, { headers });
  }

  putAlerta(alerta: CreateAlerta, id: string): Observable<MetadataRequest> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.put<MetadataRequest>(apiUrl + `Alertas/${id}`, alerta, { headers });
  }

  deleteAlerta(id: string): Observable<MetadataRequest> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.delete<MetadataRequest>(apiUrl + `Alertas/${id}`, { headers });
  }
}
