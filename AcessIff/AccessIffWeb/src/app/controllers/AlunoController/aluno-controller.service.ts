import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { Injectable } from '@angular/core';
import { UnitOfWorkService } from 'src/app/services/UnitOfWork/unit-of-work.service';
import { Aluno } from 'src/app/interfaces/aluno';
import { Observable } from 'rxjs';
import { MetadataResponse } from 'src/app/interfaces/metadata';

@Injectable({
  providedIn: 'root'
})
export class AlunoControllerService {

  constructor(
    private context: UnitOfWorkService,
  ) { }

  public GetAlunos(pageNumber: number, pageSize: number): any {
    return this.context.alunoService.GetAlunos(pageNumber, pageSize);
  }

  public GetAlunoByName(nome: string, pageNumber: number, pageSize: number): Observable<MetadataResponse> {
    return this.context.alunoService.GetAlunoByName(nome, pageNumber, pageSize);
  }

  public GetAlunoByMatricula(matricula: string): Observable<MetadataResponse> {
    return this.context.alunoService.GetAlunoByMatricula(matricula);
  }

  public PostAluno(aluno: any): any {
    return this.context.alunoService.PostAluno(aluno);
  }

  public PutAluno(aluno: any): any {
    return this.context.alunoService.PutAluno(aluno);
  }

  public DeleteAluno(id: string): any {
    return this.context.alunoService.DeleteAluno(id);
  }

  public getAlunoEmpty(): Aluno {
    const aluno: Aluno = {
      cpf: "",
      dataNascimento: "",
      email: "",
      endereco: "",
      genero: "",
      matricula: "",
      nome: "",
      rg: "",
      senha: "",
      telefone: "",
      foto: "",
    }
    return aluno;
  }
}
