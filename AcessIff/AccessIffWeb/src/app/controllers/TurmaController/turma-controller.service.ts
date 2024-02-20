import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetadataResponse } from 'src/app/interfaces/metadata';
import { Turma } from 'src/app/interfaces/turma';
import { UnitOfWorkService } from 'src/app/services/UnitOfWork/unit-of-work.service';

@Injectable({
  providedIn: 'root'
})
export class TurmaControllerService {

  constructor(
    private context: UnitOfWorkService,
  ) { }

  getTurmas(pageNumber: Number, pageSize: Number): Observable<MetadataResponse> {
    return this.context.turmaService.getTurmas(pageNumber, pageSize);
  }

  getTurmaById(id: string): Observable<MetadataResponse> {
    return this.context.turmaService.getTurmaById(id);
  }

  getTurmaByNome(nome: string, pageNumber: Number, pageSize: Number): Observable<MetadataResponse> {
    return this.context.turmaService.getTurmaByNome(nome, pageNumber, pageSize);
  }

  createTurma(turma: Turma): Observable<MetadataResponse> {
    return this.context.turmaService.createTurma(turma);
  }

  updateTurma(id: string, turma: Turma): Observable<MetadataResponse> {
    return this.context.turmaService.updateTurma(id, turma);
  }

  deleteTurma(id: string): Observable<MetadataResponse> {
    return this.context.turmaService.deleteTurma(id);
  }
}
