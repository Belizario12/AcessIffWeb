import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { MetadataResponse } from 'src/app/interfaces/metadata';
import { UnitOfWorkService } from '../UnitOfWork/unit-of-work.service';
import { apiUrl } from 'src/app/utils/apiUrl';
import { Eventos } from 'src/app/interfaces/evento';
import { CookieGeneratorService } from '../Cookie/cookie-generator.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(
    private http: HttpClient,
    private cookie: CookieGeneratorService
  ) { }

  public getEventos(): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.cookie.getToken());

    return this.http.get<MetadataResponse>(apiUrl + "Eventos", { headers: headers });
  }

  public postEventos(evento: Eventos): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.cookie.getToken());

    return this.http.post<MetadataResponse>(apiUrl + "Eventos", evento, { headers: headers });
  }
}
