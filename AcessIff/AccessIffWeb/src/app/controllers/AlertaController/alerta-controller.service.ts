import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetadataRequest, MetadataResponse } from 'src/app/interfaces/metadata';
import { UnitOfWorkService } from 'src/app/services/UnitOfWork/unit-of-work.service';

@Injectable({
  providedIn: 'root'
})
export class AlertaControllerService {

  constructor(
    private context: UnitOfWorkService,
  ) { }

  getAlertas(pageNumber: Number, pageSize: Number): Observable<MetadataResponse> {
    return this.context.alertaService.getAlertas(pageNumber, pageSize);
  }

  getAlertaById(id: string): Observable<MetadataResponse> {
    return this.context.alertaService.getAlertaById(id);
  }

  postAlerta(alerta: any): Observable<MetadataRequest> {
    return this.context.alertaService.postAlerta(alerta);
  }

  putAlerta(alerta: any, id: string): Observable<MetadataRequest> {
    return this.context.alertaService.putAlerta(alerta, id);
  }

  deleteAlerta(id: string): Observable<MetadataRequest> {
    return this.context.alertaService.deleteAlerta(id);
  }
}
