import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetadataResponse } from 'src/app/interfaces/metadata';
import { UnitOfWorkService } from 'src/app/services/UnitOfWork/unit-of-work.service';

@Injectable({
  providedIn: 'root'
})
export class EventosControllerService {

  constructor(
    private context: UnitOfWorkService,
  ) { }

  getEventos(): Observable<MetadataResponse> {
    return this.context.eventosService.getEventos();
  }

  getEvento(id: string): Observable<MetadataResponse> {
    return this.context.eventosService.getEvento(id);
  }

  postEvento(evento: any): Observable<MetadataResponse> {
    return this.context.eventosService.postEvento(evento);
  }

  putEvento(id: string, evento: any): Observable<MetadataResponse> {
    return this.context.eventosService.putEvento(id, evento);
  }

  deleteEvento(id: string): Observable<MetadataResponse> {
    return this.context.eventosService.deleteEvento(id);
  }
}
