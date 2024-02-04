import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eventos } from 'src/app/interfaces/evento';
import { MetadataResponse } from 'src/app/interfaces/metadata';
import { UnitOfWorkService } from 'src/app/services/UnitOfWork/unit-of-work.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(
    private context: UnitOfWorkService,
  ) { }

  public getEventos(): Observable<MetadataResponse> {
    return this.context.calendarioService.getEventos();
  }

  public postEventos(evento: Eventos): Observable<MetadataResponse> {
    return this.context.calendarioService.postEventos(evento);
  }
}
