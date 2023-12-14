import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { Injectable } from '@angular/core';
import { UnitOfWorkService } from 'src/app/services/UnitOfWork/unit-of-work.service';
import { Aluno } from 'src/app/interfaces/aluno';

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
