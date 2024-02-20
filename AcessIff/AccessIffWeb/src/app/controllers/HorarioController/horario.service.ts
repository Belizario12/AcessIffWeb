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

  getHorarios(pageNumber: Number, pageSize: Number): Observable<MetadataResponse> {
    return this.context.horarioService.getHorarios(pageNumber, pageSize);
  }

  getHorarioById(id: string): Observable<MetadataRequest> {
    return this.context.horarioService.getHorarioById(id);
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
