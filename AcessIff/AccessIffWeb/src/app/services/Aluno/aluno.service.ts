import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluno } from 'src/app/interfaces/aluno';
import { apiUrl } from 'src/app/utils/apiUrl';
import { CookieGeneratorService } from '../Cookie/cookie-generator.service';
import { Observable } from 'rxjs';
import { MetadataResponse } from 'src/app/interfaces/metadata';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(
    private http: HttpClient,
    private cookie: CookieGeneratorService,
  ) { }

  public GetAlunos (pageNumber: number, pageSize: number) {
    const token = this.cookie.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());

    return this.http.get(apiUrl + "Usuario/alunos", { params, headers });
  }

  public GetAlunoByName(nome: string, pageNumber: number, pageSize: number): Observable<MetadataResponse> {
    const token = this.cookie.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString())
      .set("nome", nome);

    return this.http.get<MetadataResponse>(apiUrl + "Usuario/alunos/nome", { params, headers });
  }

  public GetAlunoByMatricula (matricula: string): Observable<MetadataResponse> {
    const token = this.cookie.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = new HttpParams().set("matricula", matricula);

    return this.http.get<MetadataResponse>(apiUrl + "Usuario/aluno", { params, headers });
  }

  public PostAluno (aluno: Aluno) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    return this.http.post(apiUrl + "Usuario/aluno", aluno, { headers: headers });
  }

  public PutAluno (aluno: Aluno) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    return this.http.put(apiUrl + `Usuario/aluno/${aluno.id}`, aluno, { headers: headers });
  }

  public DeleteAluno (id: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.cookie.getToken()}`);

    return this.http.delete(apiUrl + "Usuario/aluno/" + id, { headers: headers });
  }
}
