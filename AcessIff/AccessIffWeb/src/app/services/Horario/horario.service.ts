import { CookieGeneratorService } from './../Cookie/cookie-generator.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateHorario } from 'src/app/interfaces/horario';
import { MetadataRequest, MetadataResponse } from 'src/app/interfaces/metadata';
import { apiUrl } from 'src/app/utils/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(
    private http: HttpClient,
    private cookie: CookieGeneratorService
  ) { }

  getHorarios(turmaId: string, pageNumber: Number, pageSize: Number): Observable<MetadataResponse> {
    const header = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    const params = new HttpParams()
      .append('turmaId', turmaId)
      .append('pageNumber', pageNumber.toString())
      .append('pageSize', pageSize.toString());

    return this.http.get<MetadataResponse>(apiUrl + "Horarios", { headers: header, params: params });
  }

  getHorarioById(id: string): Observable<MetadataRequest> {
    const header = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    return this.http.get<MetadataRequest>(apiUrl + `Horarios/${id}`, { headers: header });
  }

  getHorarioByDia(dia: string, turmaId: string): Observable<MetadataRequest> {
    const header = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    const params = new HttpParams()
      .append('dia', dia);

    return this.http.get<MetadataRequest>(apiUrl + `Horarios/dia/turma/${turmaId}`, { headers: header, params: params });
  }

  postHorarios(horario: CreateHorario): Observable<MetadataRequest> {
    const header = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    return this.http.post<MetadataRequest>(apiUrl + "Horarios", horario, { headers: header });
  }

  putHorarios(horario: CreateHorario, id: string): Observable<MetadataRequest> {
    const header = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    return this.http.put<MetadataRequest>(apiUrl + `Horarios/${id}`, horario, { headers: header });
  }

  deleteHorarios(id: string): Observable<MetadataRequest> {
    const header = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    return this.http.delete<MetadataRequest>(apiUrl + `Horarios/${id}`, { headers: header });
  }
}
