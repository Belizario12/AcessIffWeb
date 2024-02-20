import { Injectable } from '@angular/core';
import { CookieGeneratorService } from '../Cookie/cookie-generator.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetadataResponse } from 'src/app/interfaces/metadata';
import { apiUrl } from 'src/app/utils/apiUrl';
import { Turma } from 'src/app/interfaces/turma';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  constructor(
    private cookie: CookieGeneratorService,
    private http: HttpClient,
  ) { }

  getTurmas(pageNumber: Number, pageSize: Number): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    const params = new HttpParams()
      .append('pageNumber', pageNumber.toString())
      .append('pageSize', pageSize.toString());

    return this.http.get<MetadataResponse>(apiUrl + `Turma`, { headers, params });
  }

  getTurmaById(id: string): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.get<MetadataResponse>(apiUrl + `Turma/${id}`, { headers });
  }

  getTurmaByNome(nome: string, pageNumber: Number, pageSize: Number): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    const params = new HttpParams()
      .append('pageNumber', pageNumber.toString())
      .append('pageSize', pageSize.toString())

    return this.http.get<MetadataResponse>(apiUrl + `Turma/nome/${nome}`, { headers, params });
  }

  createTurma(turma: Turma): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.post<MetadataResponse>(apiUrl + `Turma`, turma, { headers });
  }

  updateTurma(id: string, turma: Turma): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.put<MetadataResponse>(apiUrl + `Turma/${id}`, turma, { headers });
  }

  deleteTurma(id: string): Observable<MetadataResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.getToken()}`);

    return this.http.delete<MetadataResponse>(apiUrl + `Turma/${id}`, { headers });
  }
}
