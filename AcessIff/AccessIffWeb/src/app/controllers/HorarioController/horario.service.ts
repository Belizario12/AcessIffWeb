import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetadataRequest, MetadataResponse } from 'src/app/interfaces/metadata';
import { UnitOfWorkService } from 'src/app/services/UnitOfWork/unit-of-work.service';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(
    private context: UnitOfWorkService,
  ) { }

  getHorarios(turmaId: string, pageNumber: Number, pageSize: Number): Observable<MetadataResponse> {
    return this.context.horarioService.getHorarios(turmaId, pageNumber, pageSize);
  }

  getHorarioById(id: string): Observable<MetadataRequest> {
    return this.context.horarioService.getHorarioById(id);
  }

  getHorarioByDia(dia: string, turmaId: string): Observable<MetadataRequest> {
    return this.context.horarioService.getHorarioByDia(dia, turmaId);
  }

  postHorarios(horario: any): Observable<MetadataRequest> {
    return this.context.horarioService.postHorarios(horario);
  }

  putHorarios(horario: any, id: string): Observable<MetadataRequest> {
    return this.context.horarioService.putHorarios(horario, id);
  }

  deleteHorarios(id: string): Observable<MetadataRequest> {
    return this.context.horarioService.deleteHorarios(id);
  }
}
