import { CookieGeneratorService } from './../Cookie/cookie-generator.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eventos } from 'src/app/interfaces/evento';
import { MetadataResponse } from 'src/app/interfaces/metadata';
import { apiUrl } from 'src/app/utils/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(
    private http: HttpClient,
    private cookie: CookieGeneratorService
  ) {}

  getEventos(): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.get<MetadataResponse>(apiUrl + 'Eventos', { headers });
  }

  getEvento(id: string): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.get<MetadataResponse>(apiUrl + 'Eventos/' + id, { headers });
  }

  postEvento(evento: Eventos): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.post<MetadataResponse>(apiUrl + 'Eventos', evento, { headers });
  }

  putEvento(id: string, evento: Eventos): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.put<MetadataResponse>(apiUrl + 'Eventos/' + id, evento, { headers });
  }

  deleteEvento(id: string): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.delete<MetadataResponse>(apiUrl + 'Eventos/' + id, { headers });
  }
}
